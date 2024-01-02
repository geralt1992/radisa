<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Survey;
use App\Models\Answear;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Log;

class AnswearController extends Controller
{
    
    // Log::info($answear); ZAKON storage/logs
    public function saveAnswears(Request $request) {
          
        $validator = Validator::make($request->all(), [
            'answers' => ['required'],
        ]);
  
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->json()->all();
    
        foreach ($data['answers'] as $id => $answear) {
            $new_answear = new Answear;
            $new_answear->user_id = Auth::user()->id;
            $new_answear->survey_id = $data['surveyId'];
            $new_answear->question_id = $id;
    
            $checkbox_answers = []; 
    
            if (is_array($answear)) {
                foreach ($answear as $checkbox_answer) {
                    $checkbox_answers[] = $checkbox_answer;
                }
                $new_answear->answear = json_encode($checkbox_answers);
            } else {
                $new_answear->answear = $answear;
            }
    
            $new_answear->save();
        }

        //save that auth user filled this survey
        $done_surveys_of_auth_user = json_decode(Auth::user()->doneSurveys, true) ?? []; //true upućuje da oću polje, a ne objekt -- upitnici vraćaju prazno polje jer je u bazi null, a null ne mozes modificirati, stoga prvi put kada ubacujes mora vratiti prazno polje
        $done_surveys_of_auth_user[] = $data['surveyId'];
        Auth::user()->doneSurveys = json_encode($done_surveys_of_auth_user);
        Auth::user()->save(); 

       // Track the number of how many users filled out the survey
        $survey = Survey::where('id', $data['surveyId'])->first();
        $survey->user_count += 1;
        $survey->save();

        return response(['success' => true]);
    }

}
