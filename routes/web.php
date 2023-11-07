<?php

use App\Http\Controllers\AppController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RecordController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/app', [AppController::class, 'index'])->name('app.index');
    Route::get('/app/create', [AppController::class, 'index'])->name('app.create');
    Route::post('/app/create', [AppController::class, 'index'])->name('app.store');
    Route::get('/app/{app_id}/edit', [AppController::class, 'index'])->name('app.edit');
    Route::post('/app/{app_id}/edit', [AppController::class, 'index'])->name('app.update');
    Route::delete('/app/{app_id}', [AppController::class, 'index'])->name('app.delete');

    Route::get('/app/{app_id}', [RecordController::class, 'index'])->name('record.index');
    Route::get('/app/{app_id}/create', [RecordController::class, 'index'])->name('record.create');
    Route::post('/app/{app_id}/create', [RecordController::class, 'index'])->name('record.store');
    Route::get('/app/{app_id}/{record_id}/edit', [RecordController::class, 'index'])->name('record.edit');
    Route::post('/app/{app_id}/{record_id}/edit', [RecordController::class, 'index'])->name('record.update');
    Route::delete('/app/{app_id}/{record_id}', [RecordController::class, 'index'])->name('record.delete');
});

require __DIR__ . '/auth.php';
