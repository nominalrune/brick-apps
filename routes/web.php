<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/profile', [UserController::class, 'show']);
Route::post('/profile', [UserController::class, 'update']);
Route::delete('/profile', [UserController::class, 'delete']);

Route::get('/app', [,]);
Route::post('/app', [,]);

Route::get('/app/{app_code}', [,]);
Route::post('/app/{app_code}', [,]);
Route::delete('/app/{app_code}', [,]);

Route::post('/app/{app_code}/new', [,]);
Route::get('/app/{app_code}/{id}', [,]);
Route::post('/app/{app_code}/{id}', [,]);
Route::delete('/app/{app_code}/{id}', [,]);

