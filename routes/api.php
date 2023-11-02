<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;


Route::middleware('auth:sanctum')->group(function() {
    Route::get('logout', [AuthController::class , 'logout']);
    Route::get('me' , [AuthController::class , 'me']);
});

Route::post('singup' , [AuthController::class , 'singup']);
Route::post('login' , [AuthController::class , 'login']);