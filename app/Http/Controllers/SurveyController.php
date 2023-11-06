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

        return response(['data' => $data]);
    }
}
