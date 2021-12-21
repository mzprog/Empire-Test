<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoritveController extends Controller
{
    public function add(Request $request)
    {
        $fav = Favorite::where('user_id', $request->user()->id)->where('name', $request->city)->first();
        if($fav !== null)
        return [
            'status' => true
        ];

        Favorite::create([
            'user_id' => $request->user()->id,
            'name' => $request->city
        ]);
        return [
            'status' => true
        ];
    }

    public function remove(Request $request)
    {
        $fav = Favorite::where('user_id', $request->user()->id)->where('name', $request->city)->first();
        if($fav == null)
            return [
                'status' => false
            ];

        Favorite::where('user_id', $request->user()->id)->where('name', $request->city)->delete();
        return [
            'status' => true
        ];
    }

    public function get(Request $request)
    {
        $userId = $request->user()->id;
        $favorite = Favorite::where('user_id', $userId)->get()->toArray();

        return [
            'status' => true,
            'data' => array_column($favorite, 'name')
        ];
    }
}
