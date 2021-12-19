<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WeatherController extends Controller
{
    const BASE_URL = 'http://api.openweathermap.org/data/2.5/';
    const KEY = 'cbaa806e9f0c480c05762b8682f57226';

    public function checkCity(Request $request, $city)
    {
        $url = $this->QueryURL($city);
        if ($this->responseCode($url) != "200") {
            return [
                'status' => false
            ];
        } else {
            $data = json_decode(file_get_contents($url));
            return [
                'status' => $data->cod == 200
            ];
        }
    }

    // private methods
    private function QueryURL($query)
    {
        return self::BASE_URL . "weather?q=${query}&appid=" . self::KEY;
    }

    private function responseCode($url)
    {
        $headers = get_headers($url);
        return substr($headers[0], 9, 3);
    }
}
