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

Route::middleware('auth:sanctum')->group(function () {
	Route::get('/', function () {
		return response()->json([
			"message" => "Welcome to the API",
			"status" => 200
		]);
	})->name('dashboard');
    Route::get('/profile', function (Request $request) {
        return $request->user();
    });
	Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
	Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
	Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

	Route::get('/app', [AppController::class, 'index'])->name('app.index');
	Route::get('/app/create', [AppController::class, 'create'])->name('app.create');
	Route::post('/app/create/dry', [AppController::class, 'preflightStore'])->name('app.store.dry');
	Route::post('/app/create', [AppController::class, 'store'])->name('app.store');
	Route::get('/{app_code}/edit', [AppController::class, 'edit'])->name('app.edit');
	Route::post('/{app_code}/edit', [AppController::class, 'update'])->name('app.update');
	Route::delete('/{app_code}', [AppController::class, 'destroy'])->name('app.delete');

	Route::get('/web/{app_code}', [RecordController::class, 'index'])->name('record.index');
	Route::get('/web/{app_code}/create', [RecordController::class, 'create'])->name('record.create');
	Route::post('/web/{app_code}/create', [RecordController::class, 'store'])->name('record.store');
	Route::get('/web/{app_code}/{record_id}', [RecordController::class, 'show'])->name('record.show');
	Route::get('/web/{app_code}/{record_id}/edit', [RecordController::class, 'edit'])->name('record.edit');
	Route::post('/web/{app_code}/{record_id}/edit', [RecordController::class, 'update'])->name('record.update');
	Route::delete('/web/{app_code}/{record_id}', [RecordController::class, 'destroy'])->name('record.delete');
});

require __DIR__ . '/auth.php';
