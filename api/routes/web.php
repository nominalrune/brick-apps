<?php

use App\Http\Controllers\AppController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RecordController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ViewController;
use Illuminate\Support\Facades\Route;

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
	Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
	Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

	Route::get('/users',[UserController::class, 'index'])->name('user.index');
	Route::post('/users',[UserController::class, 'store'])->name('user.store');
	Route::get('/users/{user_id}',[UserController::class, 'show'])->name('user.show');
	Route::post('/users/{user_id}',[UserController::class, 'update'])->name('user.update');
	Route::get('/users/{user_id}/archive',[UserController::class, 'archive'])->name('user.archive');
	Route::delete('/users/{user_id}',[UserController::class, 'destroy'])->name('user.delete');

	Route::get('/app', [AppController::class, 'index'])->name('app.index');
	Route::post('/app', [AppController::class, 'store'])->name('app.store');
	Route::post('/app/dry', [AppController::class, 'previewStore'])->name('app.store.dry');

	Route::post('/app/{app_code}', [AppController::class, 'update'])->name('app.update');
	Route::post('/app/{app_code}/dry', [AppController::class, 'previewUpdate'])->name('app.update.dry');
	Route::get('/app/{app_code}/archive', [AppController::class, 'archive'])->name('app.archive');
	Route::delete('/app/{app_code}', [AppController::class, 'destroy'])->name('app.delete');

	Route::get('/app/{app_code}/{view_code}', [RecordController::class, 'index'])->name('record.index');
	Route::post('/app/{app_code}/{view_code}', [RecordController::class, 'store'])->name('record.store');
	Route::get('/app/{app_code}/{view_code}/{record_id}', [RecordController::class, 'show'])->name('record.show');
	Route::post('/app/{app_code}/{view_code}/{record_id}', [RecordController::class, 'update'])->name('record.update');
	Route::delete('/app/{app_code}/{view_code}/{record_id}', [RecordController::class, 'destroy'])->name('record.delete');

	Route::get('/view', [ViewController::class, 'index'])->name('view.index');
	Route::post('/view', [ViewController::class, 'store'])->name('view.store');
	Route::get('/view/{view_code}', [ViewController::class, 'show'])->name('view.show');
	Route::post('/view/{view_code}', [ViewController::class, 'update'])->name('view.update');
	Route::delete('/view/{view_code}', [ViewController::class, 'destroy'])->name('view.delete');
});

require __DIR__ . '/auth.php';
