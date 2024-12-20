"use client"
import axios from "axios";
import Image from "next/image"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast";
import { AppContext } from "../context/Appcontext";
import { useContext } from "react";
import { useRouter } from "next/navigation";

const page = () => {

    const {register, handleSubmit, formState:{errors}} = useForm();
    const {setAuthUser, setAuthToken} = useContext(AppContext);
    const route = useRouter();

    async function submitHandler(data: any){

        const loading = toast.loading("Please wait...");

        try{
            const response = await axios.post('/api/auth/signUp', {...data});
            console.log("response of signup ", response);
            if(response.data.Success){
                toast.success(response.data.message);
            }
            setAuthToken(response.data.Token);
            setAuthUser(response.data.User);
            route.push("/dashboard");

        }catch(error: any){
            console.log("error at signup ", error);
            toast.error(error.response.data.message);

        }finally{
            toast.dismiss(loading);
        }
    }
    
    return(
        <div className=" bg-slate-200 w-full overflow-y-scroll h-[calc(100vh-5rem)] max-md:h-full max-sm:h-full flex lg:flex-row md:flex-row sm:flex-col-reverse max-[650px]:flex-col-reverse justify-around items-center">
            <div className=" lg:w-[35%] md:w-[35%] sm:w-full sm:p-10  flex flex-col gap-3">
                <h1 className=" lg:text-4xl md:test-3xl sm:text-2xl font-semibold">Create your account</h1>
                <form  className=" flex flex-col gap-3"
                    onSubmit={handleSubmit(submitHandler)}
                >
                    <div>
                        <label htmlFor="firstName">First Name<sup className=" text-red-500">*</sup></label>
                        <input type="text" id="firstName" 
                        {...register("firstName",{required:true})} 
                        placeholder="Enter your firstname" 
                        className=" border-2 p-2 outline-none rounded-md w-full"
                        />
                        {
                            errors.firstName && (
                                <p className=" text-red-500">Firstname is required</p>
                            )
                        }
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name<sup className=" text-red-500">*</sup></label>
                        <input type="text" id="lastName" 
                        {...register("lastName",{required:true})} 
                        placeholder="Enter your lastname" 
                        className=" border-2 p-2 outline-none rounded-md w-full"/>
                        {
                        errors.lastName && (
                            <p className=" text-red-500">Lastname is required</p>
                        )
                        }
                    </div>
                    <div>
                        <label htmlFor="email">Email<sup className=" text-red-500">*</sup></label>
                        <input type="email" id="email" 
                        {...register("email",{required:true})} 
                        placeholder="Enter your email" 
                        className=" border-2 p-2 outline-none rounded-md w-full"/>
                        {
                        errors.email && (
                            <p className=" text-red-500">Email is required</p>
                        )
                        }
                    </div>
                    <div>
                        <label htmlFor="password">Password<sup className=" text-red-500">*</sup></label>
                        <input type="password" id="password" 
                        {...register("password",{required:true})} 
                        placeholder="Enter your password" 
                        className=" border-2 p-2 outline-none rounded-md w-full"/>
                        {
                        errors.password && (
                            <p className=" text-red-500">Password is required</p>
                        )
                        }
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password<sup className=" text-red-500">*</sup></label>
                        <input type="Password" id="confirmPassword" 
                        {...register("confirmPassword",{required:true})} 
                        placeholder="Enter your password again" 
                        className=" border-2 p-2 outline-none rounded-md w-full"/>
                        {
                        errors.password && (
                            <p className=" text-red-500">Password is required</p>
                        )
                        }
                    </div>
                    <div>
                        <label htmlFor="businessName">Business Name<sup className=" text-red-500">*</sup></label>
                        <input type="text" id="businessName" 
                        {...register("businessName",{required:true})} 
                        placeholder="Enter your businessname" 
                        className=" border-2 p-2 outline-none rounded-md w-full"/>
                        {
                        errors.businessName && (
                            <p className=" text-red-500">Businessname is required</p>
                        )
                        }
                    </div>
                
                    <button type="submit" className=" bg-yellow-400 p-3 rounded-md font-semibold">Create Account</button>
                </form>
            </div>
            <div className=" lg:w-[30%] md:w-[30%] sm:w-[70%] flex flex-col items-end gap-9 mt-7 ">
                <div  className="  flex gap-4 p-4 rounded-md border-2  border-zinc-400 ">
                    <div>
                        <Image src={"/image/onboarding_logo_RajuImg.svg"} alt="onboardinglogo1" height={55} width={55}/>
                    </div>
                    <div className="  flex flex-col gap-3">
                        <h1 className=" font-medium">Starting with 1, Flipkart helped me expand to 6 categories with 5x growth year on year!</h1>
                        <p className=" text-sm opacity-70">Raju Lunawath, Amazestore</p>
                    </div>
                </div>
                <div className="">
                    <Image src={"/image/revamp_banner_mobile (1).svg"} alt="onboardinglogo2" height={100} width={300}/>
                </div>
            </div>
        </div>
    )

}
export default page