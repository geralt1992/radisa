<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Survey;
use App\Models\Question;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Log;


class SurveyController extends Controller
{
    public function save(Request $request) {

        //validation - DORADI PRAVILA!
        $validator = Validator::make($request->all(),
        [
            'title' => ['required'],
            'expire_date' => ['required', 'date', 'after:today'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = Auth::user();
        $data = $request->all();

        //NEW SURVEY
        $new_survey = new Survey;

        //image check and save in DB
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('uploads'), $imageName);
            $imageUrl = asset('uploads/' . $imageName);
            $new_survey->image = $imageUrl;
        } 

       
        $new_survey->user_id = $user->id;
        $new_survey->title = $data['title'];
        $new_survey->description = $data['description'];
        $new_survey->expire_date = $data['expire_date'];
        $new_survey->status = $data['status'];
        $new_survey->save();

            
        //QUESTIONS - encode za PC (bazu), decode za rad
        $questions = json_decode($data['questions']);

        foreach($questions as $question) {
            $allOptionTexts = [];

            foreach($question->data->options as $option) {
                $allOptionTexts[] = $option->optionText;
            }

            $new_question = new Question;
            $new_question->survey_id = Survey::latest()->first()->id;
            $new_question->question = $question->question;
            $new_question->type = $question->type;
            $new_question->description = $question->description;
            $new_question->options = json_encode($allOptionTexts); // Convert the array to a JSON string
            $new_question->save();
        }

        return response(['msg' => "survey created!"], 201);
    }


    public function getUnpublishedSurveys() {
        $surveys = Survey::where('status' , 'false')->where('isFinished' , false)->get();
        return response($surveys);
    }

    public function getActiveSurveys() {
        $surveys = Survey::where('status' , 'true')->where('isFinished' , false)->get();
        return response($surveys);
    }

    public function getFinishedSurveys() {
        $surveys = Survey::where('status' , 'false')->where('isFinished' , true)->get();
        return response($surveys);
    }


    public function activate(Request $request) {
        $data = $request->json()->all();
        $survey_to_activeted = Survey::where('id' , $data['id'])->first();
        $survey_to_activeted->status = 'true';
        $survey_to_activeted->save();
        //DODAJ JOŠ DA SVI USERI DOBIJU EMAIL!
        return response(['success' => true]);
    }

    public function deactive($id) {
        $survey_to_deactiveted = Survey::where('id' , $id)->first();
        $survey_to_deactiveted->status = 'false';
        $survey_to_deactiveted->save();
        return response(['success' => true]);
    }

    public function delete($id) {
        $survey_to_delete = Survey::where('id', $id)->first();
        $survey_to_delete->delete();
        return response(['success' => true]);
    }

    public function getSurvey($id) {
        $survey = Survey::where('id' , $id)->first();
        $questions = Question::where('survey_id', $id)->get();
        return response(['survey' => $survey, 'questions' => $questions]);
    }

    public function finishSurvey($id) {
        $survey = Survey::where('id' , $id)->first();
        $survey->status = 'false';
        $survey->isFinished = true;
        $survey->save();
        return response(['success' => true]);
    }


   
}
