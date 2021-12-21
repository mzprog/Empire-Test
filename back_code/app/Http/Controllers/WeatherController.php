<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;

class WeatherController extends Controller
{
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/';
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

    public function weatherCity(Request $request, $city)
    {
        $url = $this->QueryURL($city);
        if ($this->responseCode($url) != "200") {
            return [
                'status' => false
            ];
        } else {
            $data = json_decode(file_get_contents($url));

            // check code
            if ($data->cod != 200)
                return [
                    'status' => false
                ];

            //get data
            $lon = $data->coord->lon;
            $lat = $data->coord->lon;
            $units = $request->user()->units;
            if ($units == '') $units = 'metric';

            //url
            $url = $this->WeatherURL($lat, $lon, $units);
            $weatherStr = file_get_contents($url);
            $weatherData = json_decode($weatherStr);

            // favorite?
            $favorite = Favorite::where('user_id', $request->user()->id)->where('name', $city)->first();

            return [
                'status' => true,
                'units' => $units,
                'favorite' => $favorite !== null,
                'current' => [
                    'temp' => $weatherData->current->temp,
                    'title' => $weatherData->current->weather[0]->description,
                    'icon' => $this->IMG($weatherData->current->weather[0]->icon)
                ],
                'week' => array_map(function ($day) {
                    return [
                        'date' => date('D, j M', $day->dt),
                        'temp' => [
                            'min' => $day->temp->min,
                            'max' => $day->temp->max,
                        ],
                        'title' => $day->weather[0]->description,
                        'icon' => $this->IMG($day->weather[0]->icon),
                    ];
                }, array_slice((array) $weatherData->daily, 0, 7))
            ];
        }
    }

    // private methods
    private function QueryURL($query)
    {
        return self::BASE_URL . "weather?q=${query}&appid=" . self::KEY;
    }

    private function WeatherURL($lat, $lon, $units)
    {
        $params = [
            "lat=${lat}",
            "lon=${lon}",
            "units=${units}",
            "exclude=minutely,hourly",
            "appid=" . self::KEY
        ];
        $query = implode("&", $params);
        return self::BASE_URL . "onecall?${query}";
    }

    private function responseCode($url)
    {
        $headers = get_headers($url);
        return substr($headers[0], 9, 3);
    }

    private function IMG($code)
    {
        return "https://openweathermap.org/img/w/${code}.png";
    }
}
