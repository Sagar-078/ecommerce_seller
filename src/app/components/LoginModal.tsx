"use client"
import Link from "next/link";
import React, { useContext } from "react"
import { RxCross2 } from "react-icons/rx";
import { AppContext } from "../context/Appcontext";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {toast} from "react-hot-toast";
import axios from "axios";

const LoginModal = () => {
    const {setShowLoginModal, setAuthUser, setAuthToken} = useContext(AppContext);
    const {register, handleSubmit, formState:{errors}} = useForm();
    const route = useRouter();

    async function submitHandler(data: any){

        const loading = toast.loading("Please wait...");
        try{

            const response = await axios.post("/api/auth/signIn", {...data});
            console.log("response of signin ", response);

            if(response?.data?.success){
                toast.success(response?.data?.message);
            }

            setAuthToken(response.data.Token);
            setAuthUser(response.data.User);
            setShowLoginModal(false);
            route.push("/dashboard");

        }catch(error: any){
            console.log("error while signin ", error);
            toast.error(error.response.data.message);
        }finally{
            toast.dismiss(loading);
        }

    }

    return (
        <div className=" flex flex-col">
            <div className=" flex justify-between shadow-black shadow-md bg-blue-600 text-white p-4 border-b-2 border-yellow-300  rounded-t-lg">
                <p className=" flex justify-center w-full">Login</p>
                <button onClick={() => setShowLoginModal(false)}>
                    <RxCross2/>
                </button>
            </div>

            <div className=' bg-[#FFFFF9]  shadow-black shadow-md rounded-b-lg pb-7 text-black flex flex-col gap-3 items-center p-4'>
                <form  className=' w-[80%] flex flex-col gap-4 '
                    onSubmit={handleSubmit(submitHandler)}
                >
                    <input type='email' placeholder= 'Enter your registered email' className=' focus:border-blue-500 w-full  outline-none border-2  bg-transparent px-3 py-1 rounded-md'
                     {
                      ...register("email",{required:{value:true,message:"Email mustbe provided"}})
                     }
                    />
                    {
                    errors.email && (
                        <p className=' text-pink-600'>Email id is required</p>
                    )
                    }
                    <input  type='password' placeholder='Enter your password' className='focus:border-blue-500 w-full  outline-none border-2  bg-transparent px-3 py-1 rounded-md' 
                      {
                        ...register("password",{required:{value:true,message:"Password must be provided"}})
                      }
                    />
                    {
                    errors.password && (
                        <p className=' text-pink-600'>
                        Password must be provided
                        </p>
                    )
                    }

                    <button type='submit' className=' py-1 rounded-md bg-blue-600 font-semibold text-gray-100 w-full'>
                        Login
                    </button>
                </form>
                <p className=' text-center text-sm'>
                    By continuing, I agree to Flipkart’s Terms of Use & <br></br> Privacy Policy
                </p>
                <div className=' flex flex-col items-center gap-5 mt-6'>
                    <p>Don’t have an account?</p>
                    <Link href="/signUp">
                        <button className=' border-2 border-blue-700 py-1 px-2 rounded-md  text-blue-700 font-semibold'>
                            Register for new account
                        </button>
                    </Link>
                </div>
            </div>

        </div>
    )

}

export default LoginModal; 