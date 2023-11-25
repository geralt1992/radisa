<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Log;

class StudentController extends Controller
{


    public function showStudents() {
        $users = User::where('isAdmin' , false)->orderBy('created_at', 'desc')->get();
        return response($users);
    }

    public function addStudent(Request $request) {

          //validation - DORADI PRAVILA!
          $validator = Validator::make($request->all(),
          [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users', 
            'password' => 'required|string|min:1|confirmed',
            'birth_date' => 'required|date|before:today',
          ]);
  
          if ($validator->fails()) {
              return response()->json(['errors' => $validator->errors()], 422);
          }

          $data = $request->json()->all();

          $new_student = new User;
          $new_student->name = $data['name'];
          $new_student->surname = $data['surname'];
          $new_student->birth_date = $data['birth_date'];
          $new_student->email = $data['email'];
          $new_student->password = bcrypt($data['password']);
          $new_student->save();

          return response($new_student);
    }
    
    public function editStudent(Request $request) {

        //validation - DORADI PRAVILA!
        $validator = Validator::make($request->all(),
        [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|', 
            'password' => 'confirmed',
            'birth_date' => 'required|date|before:today',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->json()->all();

        $user_to_edit = User::where('id' , $data['id'])->first();
        $user_to_edit->name = $data['name'];
        $user_to_edit->surname = $data['surname'];
        $user_to_edit->birth_date = $data['birth_date'];
        $user_to_edit->email = $data['email'];
        $user_to_edit->password = empty($data['password']) ? $user_to_edit->password : bcrypt($data['password']);
        $user_to_edit->save();

        $users = User::where('isAdmin', false)->orderBy('created_at' , 'desc')->get();
        return response($users);
    }

    public function deleteStudent($id) {
        $user_to_delete = User::where('id' , $id)->first();
        $user_to_delete->delete();

        $users = User::where('isAdmin', false)->orderBy('created_at' , 'desc')->get();
        return response($users);
    }
}
