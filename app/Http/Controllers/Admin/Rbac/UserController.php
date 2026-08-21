<?php

namespace App\Http\Controllers\Admin\Rbac;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StaffUserRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Rbac/Users/Index', [
            'users' => User::query()
                ->with('role:id,name,label,is_system')
                ->orderBy('name')
                ->get(['id', 'name', 'email', 'role_id', 'created_at']),
            'currentUserId' => $this->currentUser()->id,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Rbac/Users/Form', [
            'editingUser' => null,
            'roles' => $this->roleOptions(),
        ]);
    }

    public function store(StaffUserRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'],
            'role_id' => $validated['role_id'] ?? null,
            'email_verified_at' => now(),
        ]);

        return redirect()->route('admin.users.index')
            ->with('success', 'User created successfully.');
    }

    public function edit(int $id)
    {
        $user = User::findOrFail($id);

        if ($this->isSelf($user)) {
            return redirect()->route('admin.users.index')
                ->with('error', 'You cannot edit your own account here.');
        }

        return Inertia::render('Admin/Rbac/Users/Form', [
            'editingUser' => $user->only(['id', 'name', 'email', 'role_id']),
            'roles' => $this->roleOptions(),
        ]);
    }

    public function update(StaffUserRequest $request, int $id): RedirectResponse
    {
        $user = User::findOrFail($id);

        if ($this->isSelf($user)) {
            return redirect()->route('admin.users.index')
                ->with('error', 'You cannot change your own role. Ask another super admin.');
        }

        $validated = $request->validated();

        if ($this->wouldDemoteLastSuperAdmin($user, $validated['role_id'] ?? null)) {
            return back()->with('error', 'Cannot demote the last remaining super admin.');
        }

        $data = [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role_id' => $validated['role_id'] ?? null,
        ];

        if (! empty($validated['password'])) {
            $data['password'] = $validated['password'];
        }

        $user->update($data);

        return redirect()->route('admin.users.index')
            ->with('success', 'User updated successfully.');
    }

    public function destroy(Request $request, int $id): RedirectResponse
    {
        $user = User::findOrFail($id);

        if ($this->isSelf($user)) {
            return back()->with('error', 'You cannot delete your own account.');
        }

        if ($user->isSuperAdmin() && $this->superAdminCount() <= 1) {
            return back()->with('error', 'Cannot delete the last remaining super admin.');
        }

        $user->delete();

        return redirect()->route('admin.users.index')
            ->with('success', 'User deleted successfully.');
    }

    private function isSelf(User $user): bool
    {
        return $user->id === $this->currentUser()->id;
    }

    private function currentUser(): User
    {
        /** @var User $user */
        $user = auth()->user();

        return $user;
    }


    private function wouldDemoteLastSuperAdmin(User $user, ?int $newRoleId): bool
    {
        if (! $user->isSuperAdmin()) {
            return false;
        }

        $superAdminRole = Role::query()
            ->where('name', config('rbac.super_admin_role'))
            ->first();

        if ($newRoleId !== null && (int) $newRoleId === (int) $superAdminRole?->id) {
            return false;
        }

        return $this->superAdminCount() <= 1;
    }

    private function superAdminCount(): int
    {
        return User::query()
            ->whereHas('role', fn ($q) => $q->where('name', config('rbac.super_admin_role')))
            ->count();
    }

    private function roleOptions(): array
    {
        return Role::query()
            ->orderBy('is_system', 'desc')
            ->orderBy('label')
            ->get(['id', 'name', 'label', 'is_system'])
            ->map(fn (Role $role) => [
                'value' => $role->id,
                'label' => $role->is_system ? "{$role->label} (full access)" : $role->label,
            ])
            ->all();
    }
}
