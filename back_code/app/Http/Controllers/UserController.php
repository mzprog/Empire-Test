<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function login(Request $req)
    {
        $validation = Validator::make($req->all(), [
            'email' => 'required',
            'password' => 'required'
        ]);

        if ($validation->fails()) {
            return [
                'status' => false,
                'errors' => $validation->errors()
            ];
        } else {
            $credentials = $req->only('email', 'password');
            if (Auth::attempt($credentials)) {
                $user = User::where('email', '=', $req->email)->first();
                auth()->login($user);

                return [
                    'status' => true
                ];
            } else {
                return [
                    'status' => false,
                    'message' => 'Invalid email or password'
                ];
            }
        }
    }

    public function register(Request $req)
    {
        $validation = Validator::make($req->all(), [
            'name' => 'required|min:3|max:32',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8'
        ]);

        if ($validation->fails()) {
            return [
                'status' => false,
                'errors' => $validation->errors()
            ];
        } else {
            $user = User::create(request(['name', 'email', 'password']));
            auth()->login($user);
            return [
                'status' => true,
            ];
        }
    }
}
