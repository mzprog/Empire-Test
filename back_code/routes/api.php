<?php

use App\Http\Controllers\FavoritveController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WeatherController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/logout', [UserController::class, 'logout']);
Route::get('/checkauth', [UserController::class, 'checkAuth']);

Route::middleware('auth:sanctum')->post('/unit/change', [UserController::class, 'changeUnits']);

Route::middleware('auth:sanctum')->get('/city/{city}/check', [WeatherController::class, 'checkCity']);
Route::middleware('auth:sanctum')->get('/city/{city}/weather', [WeatherController::class, 'weatherCity']);

Route::middleware('auth:sanctum')->get('/favorite/get', [FavoritveController::class, 'get']);
Route::middleware('auth:sanctum')->post('/favorite/add', [FavoritveController::class, 'add']);
Route::middleware('auth:sanctum')->post('/favorite/remove', [FavoritveController::class, 'remove']);

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
