<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\AnswearController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\SuggestionController;

Route::middleware('auth:sanctum')->group(function() {
    
    Route::get('logout', [AuthController::class , 'logout']);
   
    Route::get('unactive_surveys', [SurveyController::class, 'getUnpublishedSurveys']);
    Route::get('active_surveys', [SurveyController::class, 'getActiveSurveys']);
    Route::get('finished_surveys' , [SurveyController::class, 'getFinishedSurveys']);
    Route::post('save_survey', [SurveyController::class, 'save']);
    Route::post('update_survay', [SurveyController::class, 'update']);
    Route::post('activate_survey', [SurveyController::class, 'activate']);
    Route::get('deactive_survey/{id}' , [SurveyController::class, 'deactive']);
    Route::get('delete_survey/{id}', [SurveyController::class, 'delete']);
    Route::get('get_choosen_survey/{id}' , [SurveyController::class, 'getSurvey']);
    Route::get('finish_survey/{id}' , [SurveyController::class, 'finishSurvey']);
    Route::get('survey_results/{id}' , [SurveyController::class, 'surveyResults']);
    
    Route::post('save_survey_answear', [AnswearController::class, 'saveAnswears']);

    Route::get('show_suggestions', [SuggestionController::class, 'showSuggestions']);
    Route::post('save_suggestion', [SuggestionController::class, 'addSuggestion']);
    Route::get('delete_suggestion/{id}', [SuggestionController::class, 'deleteSuggestion']);

    Route::post('add_student' , [StudentController::class, 'addStudent']);
    Route::get('show_students', [StudentController::class, 'showStudents']);
    Route::get('delete_student/{id}', [StudentController::class, 'deleteStudent']);
    Route::post('edit_student', [StudentController::class, 'editStudent']);

    Route::get('me' , [UserController::class , 'getUser']);
    Route::get('user-surveys' , [UserController::class , 'getUserSurveys']);
    Route::get('user-survey-answear/{id}' , [UserController::class, 'getAnswersOfUserSurvey']);

});

Route::post('singup' , [AuthController::class , 'singup']);
Route::post('login' , [AuthController::class , 'login']);