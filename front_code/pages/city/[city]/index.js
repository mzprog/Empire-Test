import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from 'next/link'
import LoadingPage from "../../../Components/Layouts/LoadingPage";
import MainLayout from "../../../Components/Layouts/MainLayout";
import fetchApi from "../../../Libs/fetchApi";

const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const weatherUnit = unit => {
    if(unit === "metric")
        return <>&#8451;</>
    else if(unit === "imperial")
        return <>&#8457;</>
    else
        return <>&#8490;</>
}

export default () => {
    const router = useRouter()
    const {city} = router.query
    const [data, setData] = useState()

    const fetchData = () => {
        if(city === undefined) return

        fetchApi({url: `/api/city/${city}/weather`})
        .then(res => setData(res.data) )
    }

    const changeFav = (type) => {
        fetchApi({
            url: `/api/favorite/${type}`,
            method: 'post',
            data: {city}
        })
        .then(res => res.data.status && fetchData())
    }

    useEffect(fetchData, [city])

    if(city === undefined || data === undefined) return <LoadingPage />
console.log(data);
    const today = data.week[0]
    return (
        <MainLayout>
            <div className="flex flex-col min-h-screen">
                <div className="bg-sky-300/70 shadow-xl border border-b-sky-300 shadow-sky-200 py-2 px-4">
                    <Link href="/">
                        <a className="font-bold text-white bg-black/20 p-4">
                            Empire Test
                        </a>
                    </Link>
                    <button
                        onClick={ () => navigator.clipboard.writeText(window.location.href) } 
                        className="font-bold text-white bg-black/20 px-4 mx-4 rounded"
                    >
                        Copy Link
                    </button>
                    <select defaultValue={data.units}
                        className="font-bold text-white bg-black/20 px-4 mx-4 rounded"
                        onChange={e => {
                            fetchApi({
                                url: '/api/unit/change',
                                method: 'post',
                                data: {units: e.target.value}
                            }).then(res => {
                                if(res.data.status)
                                    fetchData()
                            })
                        }}    
                    >
                        <option value="metric">Metric</option>
                        <option value="imperial">Imperial</option>
                        <option value="standard">Standard</option>
                    </select>
                </div>
                <div className="flex-1 bg-gradient-to-b from-sky-200 to-yellow-100 flex flex-col items-center justify-center">
                    <div className="m-4 flex cursor-pointer"
                        onClick={() => {
                            const type = data.favorite?"remove":"add"
                            changeFav(type)
                        }}
                    >
                        <svg viewBox="-45 -45 600 500" 
                            style={{
                                stroke: "currentcolor",
                                strokeWidth: 40,
                                fill: data.favorite?"currentcolor":"none"
                            }}
                            className="w-8 text-sky-700"
                        >
                            <path d="M326.632,10.346c-38.733,0-74.991,17.537-99.132,46.92c-24.141-29.383-60.399-46.92-99.132-46.92
                                C57.586,10.346,0,67.931,0,138.714c0,55.426,33.049,119.535,98.23,190.546c50.162,54.649,104.729,96.96,120.257,108.626l9.01,6.769
                                l9.009-6.768c15.53-11.667,70.099-53.979,120.26-108.625C421.95,258.251,455,194.141,455,138.714
                                C455,67.931,397.414,10.346,326.632,10.346z"/>
                        </svg>
                        {
                            data.favorite?(
                                <span>
                                    Remove from Favorite
                                </span>
                            ):(
                                <span>
                                    Add to Favorite
                                </span>
                            )
                        }
                        
                    </div>
                    <div className="border shadow-md bg-white/50 rounded p-4">
                        <div className="font-bold text-xl">
                            {capitalizeFirstLetter(city)}'s Weather
                        </div>
                        <div className="text-center">
                            <img src={data.current.icon} 
                                alt={data.current.title}
                                className="mx-auto"
                            /> 
                            <div className="text-lg font-semibold">
                                {data.current.title}
                            </div>
                            <div className="text-gray-700">
                                {data.current.temp} {weatherUnit(data.units)}
                            </div>
                            
                        </div>
                    </div>

                    <div className="my-8 mx-auto px-4 grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                        <div
                            className="border shadow-md bg-white/50 rounded p-2 m-2 w-40 flex flex-col"
                        >
                            <div className="font-bold text-xl">
                                Today
                            </div>
                            <div className="text-center flex flex-col flex-1">
                                <img src={today.icon} 
                                    alt={today.title}
                                    className="mx-auto"
                                /> 
                                <div className="text-lg font-semibold flex-1">
                                    {today.title}
                                </div>
                                <div className="text-gray-700">
                                    {today.temp.min} / {today.temp.max} {weatherUnit(today.units)}
                                </div>
                                
                            </div>
                        </div>
                        {
                            data.week.slice(1,-1).map(day => (
                                <div key={day.date}
                                    className="border shadow-md bg-white/50 rounded p-2 m-2 w-40 flex flex-col"
                                >
                                    <div className="font-bold text-xl">
                                        { day.date }
                                    </div>
                                    <div className="text-center flex flex-col flex-1">
                                        <img src={day.icon} 
                                            alt={day.title}
                                            className="mx-auto"
                                        /> 
                                        <div className="text-lg font-semibold flex-1">
                                            {day.title}
                                        </div>
                                        <div className="text-gray-700 ">
                                            {day.temp.min} / {day.temp.max} {weatherUnit(data.units)}
                                        </div>
                                        
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    
                </div>
            </div>
        </MainLayout>
    );
}