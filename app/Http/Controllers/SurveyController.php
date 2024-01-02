<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Survey;
use App\Models\Question;
use App\Models\Answear;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Validator;

use Illuminate\Support\Facades\Log;

use App\Mail\NewSurvey;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Queue; //za mailove da rade u pozadini

 
class SurveyController extends Controller
{
    public function getSurvey($id) {
        $survey = Survey::where('id' , $id)->first();
        $questions = Question::where('survey_id', $id)->get();
        return response(['survey' => $survey, 'questions' => $questions]);
    }

    public function save(Request $request) {

        $validator = Validator::make($request->all(),
        [
            'title' => ['required'],
            'description' => ['required'],
            // 'expire_date' => ['required', 'date', 'after:today'],
            'image' => 'required|file|mimes:jpeg,png,jpg,gif|max:2048',
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
        // $new_survey->expire_date = $data['expire_date'];
        $new_survey->save();
        
        //QUESTIONS - encode za PC (bazu), decode za rad
        $questions = json_decode($data['questions']);
        $surveyId = $new_survey->id;
        foreach ($questions as $question) {
            $allOptionTexts = [];

            foreach ($question->data->options as $option) {
                $allOptionTexts[] = $option->optionText;
            }

            $new_question = new Question;
            $new_question->survey_id = $surveyId; 
            $new_question->question = $question->question;
            $new_question->type = $question->type;
            $new_question->description = $question->description;
            $new_question->options = json_encode($allOptionTexts); // Convert the array to a JSON string
            $new_question->save();
        }

        return response(['msg' => "survey created!"], 201);
    }

    public function update(Request $request) {

        $validator = Validator::make($request->all(),
        [
            'title' => ['required'],
            'description' => ['required'],
            // 'expire_date' => ['required', 'date', 'after:today'],
            // 'image' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }


        $survey_id = $request['survey_id'];
        $survey_creator_id = $request['user_id'];

        $survey_to_update = Survey::where('id' , $survey_id)->first();

        //IMAGE CHECK
        if(!empty($request['image'])) {
            //find and delete old
            $url = $survey_to_update->image;
            $filename = basename($url);
            $path = public_path('uploads/' . $filename);
            unlink($path);

            //save new img
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('uploads'), $imageName);
            $imageUrl = asset('uploads/' . $imageName);
            $survey_to_update->image = $imageUrl;
        }

        $survey_to_update->user_id = $survey_creator_id;
        $survey_to_update->title = $request['title'];
        $survey_to_update->description = $request['description'];
        // $survey_to_update->expire_date = $request['expire_date'];
        $survey_to_update->save();

        
        //delete all survey questions
        $old_questions_from_survey_to_update = Question::where('survey_id' , $survey_id)->delete();

        //save new questions
        $questions = json_decode($request['questions']);
        foreach($questions as $question) {
            $new_question = new Question;
            $new_question->survey_id = $survey_id;
            $new_question->question = $question->question;
            $new_question->type = $question->type;
            $new_question->description = $question->description;
            $new_question->options = $question->options; //JSON string from react part "formData.append("questions", JSON.stringify(questions));"
            $new_question->save();
        }

        return response(['msg' => 'survey updated!']);
    }

    public function delete($id) {
        $survey_to_delete = Survey::where('id', $id)->first();
        $survey_to_delete->delete();

        $users = User::whereJsonContains('doneSurveys', $id)->get(); //useri koji u columnu "doneSurveys" imaju $id
        foreach ($users as $user) {
            $doneSurveys = json_decode($user->doneSurveys, true) ?? [];
            $doneSurveys = array_map('intval', $doneSurveys);
            $doneSurveys = array_diff($doneSurveys, [$id]);
            $doneSurveys = array_values($doneSurveys); // Remove keys
            $doneSurveys = array_map('strval', $doneSurveys);
            $user->doneSurveys = json_encode($doneSurveys);
            $user->save();
        }

        return response(['success' => true]);
    }

    public function getUnpublishedSurveys() {
        $surveys = Survey::where('isActive' , false)->where('isFinished' , false)->get();
        return response($surveys);
    }

    public function getActiveSurveys() {
        $user = Auth::user();
        $user_done_surveys = json_decode($user->doneSurveys, true);
        // If it's null, we set an empty array as the value of $doneSruveysIdsToInteger IF NOT NULL convert doneSurveys into integers
        $doneSruveysIdsToInteger = is_array($user_done_surveys) ? array_map('intval', $user_done_surveys) : []; 

        $surveys = Survey::where('isActive' , true)->where('isFinished' , false)->get();
        
        if(empty($doneSruveysIdsToInteger)) {
            return response($surveys);
        }

        // vrati one gdje se ne podudaraju "doneSurveysIdsToInteger" s "Id"evima od svih survey
        $filteredSurveys = $surveys->whereNotIn('id', $doneSruveysIdsToInteger);
        return response($filteredSurveys);
    }

    public function getFinishedSurveys() {
        $surveys = Survey::where('isActive' , false)->where('isFinished' , true)->get();
        return response($surveys);
    }

    public function activate(Request $request) {
        $data = $request->json()->all();
        $survey_to_activeted = Survey::where('id', $data['id'])->first();
        $survey_to_activeted->isActive = true;
        $survey_to_activeted->save();
        
        //VRATI U PRODUKCIJI
            //send email in time delay (5 sec) - AKTIVIRAJ php artisan queue:work  + QUEUE_CONNECTION=database u env.-U
            // foreach (User::all() as $index => $recipient) {
            //     Queue::later(now()->addSeconds($index * 5), function () use ($recipient, $survey_to_activeted) {
            //         Mail::to($recipient->email)->send(new NewSurvey($recipient->name, $survey_to_activeted->title));
            //     });
            // }
    
        return response(['success' => true]);
    }
    
    public function deactive($id) {
        // Set isActive to false and user_count to 0 for the survey
        Survey::where('id', $id)->update(['isActive' => false, 'user_count' => 0]);
    
        // Delete answers related to questions in the survey
        DB::table('answears')
            ->join('questions', 'answears.question_id', '=', 'questions.id')
            ->where('questions.survey_id', $id)
            ->delete();
    
        // Remove the survey ID from the 'doneSurveys' field for all users which have that ID into "doneSurveys field
        $users = User::whereJsonContains('doneSurveys', $id)->get(); //useri koji u columnu "doneSurveys" imaju $id
        foreach ($users as $user) {
            $doneSurveys = json_decode($user->doneSurveys, true) ?? [];
            $doneSurveys = array_map('intval', $doneSurveys);
            $doneSurveys = array_diff($doneSurveys, [$id]);
            $doneSurveys = array_values($doneSurveys); // Remove keys
            $doneSurveys = array_map('strval', $doneSurveys);
            $user->doneSurveys = json_encode($doneSurveys);
            $user->save();
        }

        return response(['success' => true]);
    }
    
    public function finishSurvey($id) {
        $survey = Survey::where('id' , $id)->first();
        $survey->isActive = false;
        $survey->isFinished = true;
        $survey->save();
        return response(['success' => true]);
    }

    public function surveyResults($id) {
        $survey = Survey::where('id' , $id)->first();

        $answers = DB::table('surveys')
        ->join('questions', 'surveys.id', '=', 'questions.survey_id')
        ->join('answears', [
            ['surveys.id', '=', 'answears.survey_id'],
            ['questions.id', '=', 'answears.question_id'],
        ])
        ->where('surveys.id', $id)
        ->select(
            'questions.options',
            'questions.question',
            'questions.type',
            'answears.answear',
            'answears.question_id',
            'answears.user_id'
        )
        ->get();

        return response(['survey' => $survey, 'answears' => $answers]);
    }

    public function yearFilterDoneSurveys(Request $request) {
        $year = $request->input('year');

        if(empty($year)) {
            $surveys = Survey::where('isActive' , false)->where('isFinished' , true)->get();
            return response($surveys);
        }

        $surveys = Survey::where('isActive' , false)->where('isFinished' , true)->whereYear('created_at' , $year)->get();
        return response($surveys);
    }
}

