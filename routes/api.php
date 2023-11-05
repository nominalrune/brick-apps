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
    Route::get('/profile', function (Request $request) {
        return $request->user();
    });
    Route::post('/profile', function (Request $request) {
        return $request->user();
    });
    Route::delete('/profile', function (Request $request) {});

    Route::get('/app', function (Request $request) {});
    Route::post('/app', function (Request $request) {});

    Route::get('/app/{app_code}', function (Request $request) {});
    Route::post('/app/{app_code}', function (Request $request) {});
    Route::delete('/app/{app_code}', function (Request $request) {});
    
    Route::post('/app/{app_code}/new', function (Request $request) {});
    Route::get('/app/{app_code}/{id}', function (Request $request) {});
    Route::post('/app/{app_code}/{id}', function (Request $request) {});
    Route::delete('/app/{app_code}/{id}', function (Request $request) {});

});
