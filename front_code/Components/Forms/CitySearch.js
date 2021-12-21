import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import fetchApi from "../../Libs/fetchApi"

export default () => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm()
    const [status, setStatus] = useState({checking: false, found:undefined})
    const router = useRouter()

    const onSubmitForm = values => {
        setStatus({
            checking:true
        })
        fetchApi({url: `/api/city/${values.city}/check`}).then(res => {
            if(! res.data.status)
                setStatus({checking:false, found:false})
            else{
                router.push(`/city/${values.city}`) 
            }
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmitForm)}
            className="w-80 m-auto"
        >
            <div>
                <label htmlFor="city_field" className="font-semibold block text-left p-1">
                    Search for a city &nbsp;
                    { status.checking && (
                         <span className='italic text-yellow-600'>
                            checking...
                        </span>
                    ) }
                    { status.found === false && (
                         <span className='italic text-red-600'>
                            city not found
                        </span>
                    ) }
                   
                </label>
                <div className="flex">
                    <input type="text" id="city_field" 
                        {...register('city',  {
                            required: {
                                value: true,
                                message: "Password is required"
                            }
                        })}
                        onChange={() => status.found === false && setStatus({checking:false, found:undefined}) }
                        className="border border-gray-300 rounded-l-lg my-1 py-1 px-2 flex-1"
                    />
                    <input type="submit" value="Search"
                        className="border-gray-300 rounded-r-lg my-1 py-1 px-2 bg-sky-400 text-white border-0 font-semibold hover:bg-sky-500"
                    />
                </div>
               
                <div className='text-sm text-red-400'>
                    {errors?.pass?.message}
                </div>
            </div>
        </form>
    )
}