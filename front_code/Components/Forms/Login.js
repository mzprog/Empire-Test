import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router';
import fetchApi from '../../Libs/fetchApi';
import { useState } from 'react';

export default () => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm()
    const router = useRouter()
    const [sysErrors, setSysErrors] = useState() 

    const onSubmitForm = values => {
        fetchApi({ url: '/sanctum/csrf-cookie' }).then(response => {
            fetchApi({
                method: 'post', url: '/api/login',
                data: values,
            }).then(json => { 
                if(json.data.status) router.push('/')
                else setSysErrors(json.data.message)
            })
        })
    }

    return (
        <>
            <h1 className="text-2xl font-semibold text-gray-700 mb-4">
                Login
            </h1>
            <div className="flex justify-center">
                <form onSubmit={handleSubmit(onSubmitForm)}>
                    <div>
                        <label htmlFor="reg_email" className="font-semibold block text-left p-1">
                            Email:
                        </label>
                        <input type="email" id="reg_email" 
                            {...register('email',  {
                                required: {
                                    value: true,
                                    message: "Email is required"
                                }
                            })}
                            className="border border-gray-300 rounded-lg my-1 py-1 px-2"
                        />
                        <div className='text-sm text-red-400'>
                            {errors?.email?.message}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="reg_pass" className="font-semibold block text-left p-1">
                            Password:
                        </label>
                        <input type="password" id="reg_pass" 
                             {...register('password',  {
                                required: {
                                    value: true,
                                    message: "Password is required"
                                }
                            })}
                            className="border border-gray-300 rounded-lg my-1 py-1 px-2"
                        />
                        <div className='text-sm text-red-400'>
                            {errors?.pass?.message}
                        </div>
                        {
                            sysErrors !== undefined && (
                                <div className='text-sm text-red-400'>
                                    {sysErrors}
                                </div>
                            )
                        }
                    </div>
                   
                    <div>
                        <input type="submit" value="Login"
                            className="border-gray-300 rounded-lg my-1 py-1 px-2 w-full bg-sky-400 text-white border-0 font-semibold hover:bg-sky-500"
                        />
                    </div>
                </form>
            </div>
        </>
    )
}