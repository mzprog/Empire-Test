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
                    <select 
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

                    <div className="my-8 mx-auto px-4 flex flex-wrap justify-between">
                        <div
                            className="border shadow-md bg-white/50 rounded p-4 m-2 w-44 flex flex-col"
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
                                    className="border shadow-md bg-white/50 rounded p-4 m-2 w-44 flex flex-col"
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