<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Like;
use Illuminate\Support\Facades\Log;

class LikeController extends Controller
{

    public function getLikes() {
        $grade_sum = 0;
        $number_of_users = 0;
        $avrage_grade = 0;

        foreach(Like::all() as $like) {
            $grade_sum+= $like->grade;
            $number_of_users++;
        }

        $avrage_grade = $grade_sum / $number_of_users;

        return response([
            'number_of_users' => $number_of_users, 
            'avrage_grade' => $avrage_grade
        ]);
    }

    public function saveLike(Request $request) {
        $data = $request->json()->all();
        
        $new_like = new Like;
        $new_like->user_id = $data['id'];
        $new_like->grade = $data['grade'];
        $new_like->save();

        $msg = 'Ocjena uspješno spremljena!';

        return response($msg);
    }
    
}
