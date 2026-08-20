<?php

use App\Http\Controllers\Admin\CompanyContentController;
use App\Http\Controllers\Admin\ContactInquiryController;
use App\Http\Controllers\Admin\CoreValueController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\FaqAdminController;
use App\Http\Controllers\Admin\HomeHeroController;
use App\Http\Controllers\Admin\NetworkTechnologyController;
use App\Http\Controllers\Admin\OfficeLocationController;
use App\Http\Controllers\Admin\PageCtaController;
use App\Http\Controllers\Admin\PlanController;
use App\Http\Controllers\Admin\PromotionController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\TeamMemberController;
use App\Http\Controllers\Admin\WebsiteSettingsController;
use App\Http\Controllers\Admin\WhyChooseUsController;
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
})->middleware(['auth'])->name('dashboard');

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    // Dashboard
    Route::get('/', [DashboardController::class, '__invoke'])->name('dashboard');

    // Legacy Settings
    Route::get('/settings', [SettingsController::class, 'edit'])->name('settings.edit');
    Route::post('/settings', [SettingsController::class, 'update'])->name('settings.update');

    // Website Settings
    Route::get('/settings/brand', [WebsiteSettingsController::class, 'brand'])->name('settings.brand');
    Route::post('/settings/brand', [WebsiteSettingsController::class, 'updateBrand'])->name('settings.brand.update');
    Route::get('/settings/theme', [WebsiteSettingsController::class, 'theme'])->name('settings.theme');
    Route::post('/settings/theme', [WebsiteSettingsController::class, 'updateTheme'])->name('settings.theme.update');
    Route::get('/settings/general', [WebsiteSettingsController::class, 'general'])->name('settings.general');
    Route::post('/settings/general', [WebsiteSettingsController::class, 'updateGeneral'])->name('settings.general.update');

    // Homepage - Hero
    Route::resource('home-hero', HomeHeroController::class)->except(['show']);
    Route::post('home-hero/{id}/activate', [HomeHeroController::class, 'activate'])->name('home-hero.activate');
    Route::post('home-hero/{id}/deactivate', [HomeHeroController::class, 'deactivate'])->name('home-hero.deactivate');

    // Homepage - Why Choose Us
    Route::resource('why-choose-us', WhyChooseUsController::class)->except(['show']);

    // Homepage - Services
    Route::resource('services', ServiceController::class)->except(['show']);

    // Homepage - Network Technology
    Route::resource('network-tech', NetworkTechnologyController::class)->except(['show']);

    // Promotions
    Route::resource('promotions', PromotionController::class)->except(['show']);

    // About - Core Values
    Route::resource('core-values', CoreValueController::class)->except(['show']);

    // About - Company Content (Mission, Vision, Journey)
    Route::get('company/mission', [CompanyContentController::class, 'missionIndex'])->name('company.mission.index');
    Route::get('company/mission/create', [CompanyContentController::class, 'missionCreate'])->name('company.mission.create');
    Route::post('company/mission', [CompanyContentController::class, 'missionStore'])->name('company.mission.store');
    Route::get('company/mission/{id}/edit', [CompanyContentController::class, 'missionEdit'])->name('company.mission.edit');
    Route::put('company/mission/{id}', [CompanyContentController::class, 'missionUpdate'])->name('company.mission.update');
    Route::delete('company/mission/{id}', [CompanyContentController::class, 'missionDestroy'])->name('company.mission.destroy');

    Route::get('company/vision', [CompanyContentController::class, 'visionIndex'])->name('company.vision.index');
    Route::get('company/vision/create', [CompanyContentController::class, 'visionCreate'])->name('company.vision.create');
    Route::post('company/vision', [CompanyContentController::class, 'visionStore'])->name('company.vision.store');
    Route::get('company/vision/{id}/edit', [CompanyContentController::class, 'visionEdit'])->name('company.vision.edit');
    Route::put('company/vision/{id}', [CompanyContentController::class, 'visionUpdate'])->name('company.vision.update');
    Route::delete('company/vision/{id}', [CompanyContentController::class, 'visionDestroy'])->name('company.vision.destroy');

    Route::get('company/journey', [CompanyContentController::class, 'journeyIndex'])->name('company.journey.index');
    Route::get('company/journey/create', [CompanyContentController::class, 'journeyCreate'])->name('company.journey.create');
    Route::post('company/journey', [CompanyContentController::class, 'journeyStore'])->name('company.journey.store');
    Route::get('company/journey/{id}/edit', [CompanyContentController::class, 'journeyEdit'])->name('company.journey.edit');
    Route::put('company/journey/{id}', [CompanyContentController::class, 'journeyUpdate'])->name('company.journey.update');
    Route::delete('company/journey/{id}', [CompanyContentController::class, 'journeyDestroy'])->name('company.journey.destroy');

    Route::get('company/about-settings', [CompanyContentController::class, 'aboutSettings'])->name('company.about-settings');

    // Team Members
    Route::resource('team', TeamMemberController::class)->except(['show']);

    // FAQs
    Route::resource('faqs', FaqAdminController::class)->except(['show']);

    // Contact Inquiries
    Route::get('inquiries', [ContactInquiryController::class, 'index'])->name('inquiries.index');
    Route::get('inquiries/{id}', [ContactInquiryController::class, 'show'])->name('inquiries.show');
    Route::post('inquiries/{id}/status', [ContactInquiryController::class, 'updateStatus'])->name('inquiries.status');
    Route::delete('inquiries/{id}', [ContactInquiryController::class, 'destroy'])->name('inquiries.destroy');

    // Plans / Packages
    Route::resource('plans', PlanController::class)->except(['show']);

    // Office Locations
    Route::resource('locations', OfficeLocationController::class)->except(['show']);

    // Page CTAs
    Route::get('page-ctas', [PageCtaController::class, 'index'])->name('page-ctas.index');
    Route::get('page-ctas/{id}/edit', [PageCtaController::class, 'edit'])->name('page-ctas.edit');
    Route::put('page-ctas/{id}', [PageCtaController::class, 'update'])->name('page-ctas.update');
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
