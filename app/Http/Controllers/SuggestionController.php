<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Suggestion;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Log;


class SuggestionController extends Controller
{

    public function showSuggestions() {
        $suggestions_with_users = DB::table('suggestions')
        ->join('users' , 'suggestions.user_id', '=' , 'users.id' )
        ->select('users.name', 'users.surname' , 'suggestions.*')
        ->get();
        return response($suggestions_with_users);
    }

    public function addSuggestion(Request $request) {

          //validation - DORADI PRAVILA!
          $validator = Validator::make($request->all(), [
            'title' => ['required', 'regex:/^[a-zA-Z0-9.,?!: čćžšđ]+$/u'], // Allow čćžšđ and space, and alpha num, and +-,.?
            'content' => ['required', 'regex:/^[a-zA-Z0-9.,?!: čćžšđ]+$/u']
        ]);
  
          if ($validator->fails()) {
              return response()->json(['errors' => $validator->errors()], 422);
          }

          $data = $request->json()->all();
          $new_suggestion = new Suggestion;
          $new_suggestion->user_id = Auth::user()->id;
          $new_suggestion->title = $data['title'];
          $new_suggestion->content = $data['content'];
          $new_suggestion->save();

        return response(['success' => true]);

    }

    public function deleteSuggestion($id) {
        $suggestion_to_delete = Suggestion::where('id' , $id)->first();
        $suggestion_to_delete->delete();

        $suggestions_with_users = DB::table('suggestions')
        ->join('users' , 'suggestions.user_id', '=' , 'users.id' )
        ->select('users.name', 'users.surname' , 'suggestions.*')
        ->get();
        
        return response($suggestions_with_users);
    }

}
