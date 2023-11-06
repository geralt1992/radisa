<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SurveyController;

Route::middleware('auth:sanctum')->group(function() {
    Route::get('me' , [AuthController::class , 'me']);
    Route::get('logout', [AuthController::class , 'logout']);
   

    Route::post('save_survey', [SurveyController::class, 'save']);
});

Route::post('singup' , [AuthController::class , 'singup']);
Route::post('login' , [AuthController::class , 'login']);