<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Survey;
use App\Models\Question;
use App\Models\Answear;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function getUser() {
        $user = Auth::user();
        $is_admin = Auth::user()->isAdmin;

        if($is_admin === 1) {
            $is_admin = true;
        } else {
            $is_admin = false;
        }
        return response(['user' => $user, 'admin' => $is_admin]);
    }

    public function getUserSurveys() {
        $user_finished_surveys = json_decode(Auth::user()->doneSurveys);
        $surveys = [];
        foreach($user_finished_surveys as $survey_id) {
            $surveys[] = Survey::where('id', $survey_id)->orderBy('created_at', 'desc')->first();
        }
        return response($surveys);
    }

    public function getAnswersOfUserSurvey($id) {
        $user_id = Auth::user()->id;
        $survey_id = $id;
        $survey = Survey::where('id' , $id)->first();
        $questionsWithAnswers = DB::table('questions')
            ->join('answears', 'questions.id', '=', 'answears.question_id')
            ->select('questions.*', 'answears.*')
            ->where('questions.survey_id', $survey_id)
            ->where('answears.user_id', $user_id)
            ->get();

        return response(['questionsAndAnswers' => $questionsWithAnswers, 'survey' => $survey]);
    }
}
