import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import fetchApi from '../../Libs/fetchApi';

export default () => {
    const {register, handleSubmit, formState: {errors} } = useForm()
    const [sysErrors, setSysErrors] = useState() 
    const router = useRouter()

    const onSubmitForm = values => {
        fetchApi({ url: '/sanctum/csrf-cookie' }).then(() => {
            fetchApi({
                method: 'post', url: '/api/register',
                data: values,
            }).then(json => { 
                if(json.data.status) router.push('/')
                else setSysErrors(json.data.errors)
            })
        })
    }

    return (
        <>
            <h1 className="text-2xl font-semibold text-gray-700 mb-4">
                Register
            </h1>
            <div className="flex justify-center">
                <form onSubmit={handleSubmit(onSubmitForm)}>
                    <div>
                        <label htmlFor="reg_name" className="font-semibold block text-left p-1">
                            Name:
                        </label>
                        <input type="text" id="reg_name" 
                            {...register('name', {
                                required: {
                                    value: true,
                                    message: "Name is required"
                                }
                            })}
                            className="border border-gray-300 rounded-lg my-1 py-1 px-2"
                        />
                        <div className='text-sm text-red-400'>
                            {errors?.name?.message}
                        </div>
                        {
                            sysErrors?.name?.map((err, key) => (
                                <div className='text-sm text-red-400' key={key}>
                                    {err}
                                </div>
                            ))
                        }
                    </div>
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
                        {
                            sysErrors?.email?.map((err, key) => (
                                <div className='text-sm text-red-400' key={key}>
                                    {err}
                                </div>
                            ))
                        }
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
                                },
                                minLength: {
                                    value: 8,
                                    message: "Password minimum length is 8"
                                }
                            })}
                            className="border border-gray-300 rounded-lg my-1 py-1 px-2"
                        />
                        <div className='text-sm text-red-400'>
                            {errors?.password?.message}
                        </div>
                        {
                            sysErrors?.password?.map((err, key) => (
                                <div className='text-sm text-red-400' key={key}>
                                    {err}
                                </div>
                            ))
                        }
                    </div>
                   
                    <div>
                        <input type="submit" value="register"
                            className="border-gray-300 rounded-lg my-1 py-1 px-2 w-full bg-sky-400 text-white border-0 font-semibold hover:bg-sky-500"
                        />
                    </div>
                </form>
            </div>
        </>
    )
}