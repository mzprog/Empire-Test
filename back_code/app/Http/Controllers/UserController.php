<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function login()
    {
        return [
            'status' => false
        ]; 
    }

    public function register(Request $req)
    {
        $validation = Validator::make($req->all(), [ 
            'name' => 'required|min:3|max:32',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8'
        ]);
    
        if($validation->fails()){
            return [
                'status' => false,
                'errors' => $validation->errors()
            ];
        } else{
            User::create(request(['name', 'email', 'password']));
            return [
                'status' => true,
            ];
        }
    }
}