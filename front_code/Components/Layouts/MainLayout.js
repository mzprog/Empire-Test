import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import fetchApi from "../../Libs/fetchApi"
import LoadingPage from "./LoadingPage"

export default (props) => {
    const [auth, setAuth] = useState()
    const router = useRouter()

    useEffect(() => {
        fetchApi({url: '/api/checkauth'})
        .then(json => setAuth(json.data.auth))
    },[])

    if(auth === undefined) return <LoadingPage />
    // go to login
    if(!auth) {
        router.push({pathname: "/login"})
        return <LoadingPage />
    }

    return (
        <div>
            <Head>
                <title>Empire Weather</title>
            </Head>
            {props.children}
        </div>
    )
}