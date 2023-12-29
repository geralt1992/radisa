<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    // public function singup(Request $request) {

    //     //VALIDATION
    //     $validator = Validator::make($request->all(), [
    //         'name' => 'required|string|max:50',
    //         'email' => 'required|email|string|unique:users|max:50',
    //         'password' => 'required|confirmed|string|min:1',
    //     ]);

    //     if($validator->fails()) {
    //         return response(['errors' => $validator->errors()], 400);
    //     }


    //     $data = $request->json()->all();

    //     $user = User::create([
    //         'name' => $data['name'],
    //         'email' => $data['email'],
    //         'password' => bcrypt($data['password'])
    //     ]);

    //     $token = $user->createToken('main')->plainTextToken;

    //     return response(['user' => $user, 'token' => $token]);
    // }

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
            return response(['msg' => 'Krivi pristupni podatci!'], 422);
        }

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        $isAdmin = Auth::user()->isAdmin;

        if($isAdmin === 1) {
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

    public function createAdmin() {
        User::create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt(1),
            'isAdmin' => 1
        ]);
        $msg = 'Adminstratoski profil je kreiran, ostale korisničke račune kreirate iz administratorskog profila. Podaci za prijavu: email:admin@gmail.com lozinka:1';
        return response($msg);
    }

    public function isAdminCreated() {
        $isCreated = false;
        foreach (User::all() as $user) {
            if($user->isAdmin === 1) {
                $isCreated = true;
            }
        }

        return response($isCreated);
    }

}
