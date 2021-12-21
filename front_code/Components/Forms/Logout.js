import { useRouter } from "next/router"
import fetchApi from "../../Libs/fetchApi"

export default () => {
    const router = useRouter()
    
    const logout = () => {
        fetchApi({ url: '/sanctum/csrf-cookie' }).then(response => {
            fetchApi({ method: 'post', url: '/api/logout' })
            .then(json => { 
                if(json.data.status) router.push('/login') 
            })
        })
    }

    return (
        <button 
            className="font-bold text-white bg-black/20 hover:bg-black/30 px-4 mx-4 rounded"
            onClick={logout}
        >
            Logout
        </button>
    )
}