import Link from "next/link"
import { useEffect, useState } from "react"
import fetchApi from "../Libs/fetchApi"

export default () => {

    const [data, setData] = useState([])

    useEffect(() => {
        fetchApi({url: '/api/favorite/get'})
        .then(json => {
            if(json.data.status) setData(json.data.data)
        })
    }, [])

    if(data.length === 0) return ''
    
    return (
        <div className="mt-4 p-2 border-t border-sky-300">
            <h1 className="text-xl font-semibold">
                Favorite cities
            </h1>
            <div className=" w-80 mx-auto my-8">
                {
                    data.map(city => (
                        <Link href={`/city/${city}`} key={city}>
                            <a className=" block m-4 py-2 px-4 bg-sky-400 hover:bg-sky-500 text-white truncate rounded">
                                {city}
                            </a>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}