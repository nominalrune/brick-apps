<?php

use App\Http\Controllers\AppController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RecordController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\App;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard',[
        "apps" => App::all(),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Log::info('web.php', ["request" => Request::all()]);
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/app', [AppController::class, 'index'])->name('app.index');
    Route::get('/app/create', [AppController::class, 'create'])->name('app.create');
    Route::post('/app/create/dry', [AppController::class, 'preflightStore'])->name('app.store.dry');
    Route::post('/app/create', [AppController::class, 'store'])->name('app.store');
    Route::get('/app/{app_code}/edit', [AppController::class, 'edit'])->name('app.edit');
    Route::post('/app/{app_code}/edit', [AppController::class, 'update'])->name('app.update');
    Route::delete('/app/{app_code}', [AppController::class, 'destroy'])->name('app.delete');

    Route::get('/app/{app_code}', [RecordController::class, 'index'])->name('record.index');
    Route::get('/app/{app_code}/create', [RecordController::class, 'create'])->name('record.create');
    Route::post('/app/{app_code}/create', [RecordController::class, 'store'])->name('record.store');
    Route::get('/app/{app_code}/{record_id}', [RecordController::class, 'show'])->name('record.show');
    Route::get('/app/{app_code}/{record_id}/edit', [RecordController::class, 'index'])->name('record.edit');
    Route::post('/app/{app_code}/{record_id}/edit', [RecordController::class, 'index'])->name('record.update');
    Route::delete('/app/{app_code}/{record_id}', [RecordController::class, 'index'])->name('record.delete');
});

require __DIR__ . '/auth.php';
