<?php

namespace App\Http\Controllers\Admin\Rbac;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\RoleRequest;
use App\Models\Role;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RoleController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Rbac/Roles/Index', [
            'roles' => Role::query()
                ->withCount('users')
                ->orderBy('is_system', 'desc')
                ->orderBy('name')
                ->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Rbac/Roles/Form', [
            'role' => null,
            'permissionCatalog' => $this->permissionCatalog(),
        ]);
    }

    public function store(RoleRequest $request): RedirectResponse
    {
        Role::create($request->validated());

        return redirect()->route('admin.roles.index')
            ->with('success', 'Role created successfully.');
    }

    public function edit(int $id)
    {
        $role = Role::findOrFail($id);

        if ($role->is_system) {
            return redirect()->route('admin.roles.index')
                ->with('error', 'System roles cannot be edited.');
        }

        return Inertia::render('Admin/Rbac/Roles/Form', [
            'role' => $role,
            'permissionCatalog' => $this->permissionCatalog(),
        ]);
    }

    public function update(RoleRequest $request, int $id): RedirectResponse
    {
        $role = Role::findOrFail($id);

        if ($role->is_system) {
            return redirect()->route('admin.roles.index')
                ->with('error', 'System roles cannot be edited.');
        }

        $role->update($request->validated());

        return redirect()->route('admin.roles.index')
            ->with('success', 'Role updated successfully.');
    }

    public function destroy(Request $request, int $id): RedirectResponse
    {
        $role = Role::findOrFail($id);

        if ($role->is_system) {
            return back()->with('error', 'System roles cannot be deleted.');
        }

        if ($role->users()->exists()) {
            return back()->with('error', "The '{$role->label}' role is still assigned to {$role->users()->count()} user(s). Reassign them first.");
        }

        $role->delete();

        return redirect()->route('admin.roles.index')
            ->with('success', 'Role deleted successfully.');
    }

    private function permissionCatalog(): array
    {
        $grouped = [];

        foreach (config('rbac.permissions') as $name => $meta) {
            $grouped[$meta['group']][] = [
                'name' => $name,
                'label' => $meta['label'],
            ];
        }

        return $grouped;
    }
}
