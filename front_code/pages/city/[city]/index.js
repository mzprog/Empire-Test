import { useRouter } from "next/router";
import { useEffect } from "react";
import LoadingPage from "../../../Components/Layouts/LoadingPage";
import MainLayout from "../../../Components/Layouts/MainLayout";
import fetchApi from "../../../Libs/fetchApi";

export default () => {
    const router = useRouter()
    const {city} = router.query

    useEffect(() => {
        if(city === undefined) return

        fetchApi({url: `/api/city/${city}/weather`})
        .then(res => console.log(res.data) )
    }, [city])

    if(city === undefined) return <LoadingPage />

    return (
        <MainLayout>
            <div>
                city : {city}
            </div>
        </MainLayout>
    );
}