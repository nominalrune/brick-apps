<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AppController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
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
	Route::get('/users/{id}',[UserController::class, 'show'])->name('user.show');
	Route::post('/users/{id}',[UserController::class, 'update'])->name('user.update');
	Route::get('/users/{id}/archive',[UserController::class, 'archive'])->name('user.archive');
	Route::delete('/users/{id}',[UserController::class, 'destroy'])->name('user.delete');

	Route::get('/apps', [AppController::class, 'index'])->name('app.index');
	Route::post('/apps', [AppController::class, 'store'])->name('app.store');
	Route::post('/apps/dry', [AppController::class, 'previewStore'])->name('app.store.dry');

	Route::post('/apps/{app_code}', [AppController::class, 'update'])->name('app.update');
	Route::post('/apps/{app_code}/dry', [AppController::class, 'previewUpdate'])->name('app.update.dry');
	Route::get('/apps/{app_code}/archive', [AppController::class, 'archive'])->name('app.archive');
	Route::delete('/apps/{app_code}', [AppController::class, 'destroy'])->name('app.delete');

	Route::get('/app/{app_code}', [RecordController::class, 'index'])->name('record.index');
	Route::get('/app/{app_code}/{view_code}', [RecordController::class, 'index'])->name('record.index');
	Route::post('/app/{app_code}/{view_code}', [RecordController::class, 'store'])->name('record.store');
	Route::get('/app/{app_code}/{view_code}/{record_id}', [RecordController::class, 'show'])->name('record.show');
	Route::post('/app/{app_code}/{view_code}/{record_id}', [RecordController::class, 'update'])->name('record.update');
	Route::delete('/app/{app_code}/{view_code}/{record_id}', [RecordController::class, 'destroy'])->name('record.delete');


	// Route::get('/views', [ViewController::class, 'index'])->name('view.index');
	Route::post('/views/{app_code}', [ViewController::class, 'store'])->name('view.store');
	Route::get('/views/{app_code}/{view_code}', [ViewController::class, 'show'])->name('view.show');
	Route::post('/views/{app_code}/{view_code}', [ViewController::class, 'update'])->name('view.update');
	Route::delete('/views/{app_code}/{view_code}', [ViewController::class, 'destroy'])->name('view.delete');
});
