<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function singup(Request $request) {

        //VALIDATION
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:50',
            'email' => 'required|email|string|unique:users|max:50',
            'password' => 'required|confirmed|string|min:1',
        ]);

        if($validator->fails()) {
            return response(['errors' => $validator->errors()], 400);
        }


        $data = $request->json()->all();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response(['user' => $user, 'token' => $token]);
    }

    public function login(Request $request) {

        //VALIDATION
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|string|max:50',
            'password' => 'required|string|min:1',
            'remember' => 'boolean'
        ]);

        if($validator->fails()) {
            return response(['errors' => $validator->errors()], 422);
        }


        $data = $request->json()->all();

        $remember = $data['remember'] ?? false;
        unset($data['remember']);

        if(!Auth::attempt($data, $remember)) {
            return response(['msg' => 'loši pristupni podatci'], 422);
        }

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        $isAdmin = Auth::user()->isAdmin;

        if($isAdmin === "1") {
            $isAdmin = true;
        } else {
            $isAdmin = false;
        }

        return response(['user' => $user, 'token' => $token, 'admin' => $isAdmin]);
    }

    public function logout() {
        $user = Auth::user();
        $user->currentAccessToken()->delete();

        return response(['msg' => 'uspješno odjavljen']);
    }

    public function me() {
        $user = Auth::user();
        $isAdmin = Auth::user()->isAdmin;

        if($isAdmin === "1") {
            $isAdmin = true;
        } else {
            $isAdmin = false;
        }

        return response(['user' => $user, 'admin' => $isAdmin]);
    }
}
