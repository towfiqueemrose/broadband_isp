<?php

use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PlansController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StubPageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/plans', [PlansController::class, 'index'])->name('plans.index');

Route::get('/about', [\App\Http\Controllers\AboutController::class, 'index'])->name('about.index');

Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
Route::post('/contact', [ContactController::class, 'store'])
    ->name('contact.store')
    ->middleware('throttle:6,1');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/settings', [SettingsController::class, 'edit'])->name('settings.edit');
    Route::post('/settings', [SettingsController::class, 'update'])->name('settings.update');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

foreach ([
    'coverage' => 'coverage.index',
    'faq' => 'faq.index',
    'terms' => 'legal.terms',
    'privacy' => 'legal.privacy',
] as $uri => $name) {
    Route::get("/{$uri}", [StubPageController::class, 'show'])
        ->defaults('page', $uri)
        ->name($name);
}

require __DIR__.'/auth.php';
