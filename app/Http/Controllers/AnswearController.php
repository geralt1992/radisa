<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Answear;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Log;

class AnswearController extends Controller
{

    // Log::info($answear); ZAKON storage/logs
    public function saveAnswears(Request $request) {
        $data = $request->json()->all();
        $checkbox_answers = [];

        foreach($data['answers'] as $id => $answear) {
            $new_answear = new Answear;
            $new_answear->user_id = Auth::user()->id;
            $new_answear->survey_id = $data['surveyId'];
            $new_answear->question_id = $id;

            if(is_array($answear)) {
                foreach($answear as $checkbox_answer) {
                    $checkbox_answers[] = $checkbox_answer;
                } 
                $new_answear->answear = json_encode($checkbox_answers);
            } else {
                $new_answear->answear = $answear;
            }
           
            $new_answear->save();
        }

        return response($data);
      
    }
}
