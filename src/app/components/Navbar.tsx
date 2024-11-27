"use client"
import Image from "next/image"
import Link from "next/link"
import React, { useContext, useEffect, useState } from "react"
import {RxDashboard} from 'react-icons/rx'
import {BiLogOut} from 'react-icons/bi'
import { AppContext } from "../context/Appcontext"
import { usePathname, useRouter } from "next/navigation"
import toast from "react-hot-toast"


export default function Navbar(){
    const {setShowLoginModal, user, setAuthToken, setAuthUser, isContextRedy} = useContext(AppContext);
    const router = useRouter();
    // const [isClient, setIsClient] = useState(false);

    console.log("is context at navbar" , isContextRedy);

    const [isMounted, setIsMounted] = useState(false);

    function logoutHandler(){
        localStorage.clear();
        setAuthToken(null);
        setAuthUser(null);
        setShowLoginModal(false);
        router.push("/");
        toast.success("Logout successfully");
        
    }

    const pathName = usePathname();
    const generalPathName = ['/', '/signUp'];

    useEffect(() => {
        setIsMounted(true);
    }, [user]);

    if(!isMounted){
        return;
    }
    
    return (
        <div className= {`flex justify-between shadow-xl p-4 h-20 ${generalPathName.includes(pathName) ? "bg-slate-100" : "bg-slate-400"}`}>
            <Link href={"/"}>
                <Image src={"/image/flipkart_logo_color_revamp.svg"} alt="" height={100} width={110}/>
            </Link>

            {
                // isContextRedy ? 
                // (
                    user?.profile ? (
                        <div className=" group   flex gap-2 items-center pr-5">
                
                            <div className=" cursor-pointer relative flex gap-2 items-center group">
                                <img className=" rounded-full " src={user?.profile} alt="userimage" height={40} width={40}/>
                            <div className=" invisible group-hover:visible h-[30px] w-[30px] bg-slate-800 rounded-md rotate-45 z-50 absolute top-9">
            
                            </div>
                                <div className="invisible group-hover:visible z-50 w-[200px] h-[120px] bg-slate-800 absolute  top-12 translate-x-[-150px] flex flex-col gap-3 p-4 rounded-md">
                                    <Link href="/dashboard" prefetch={true} className=" hover:bg-blue-500 w-full flex items-center gap-2  text-white font-semibold p-2 rounded-md" ><RxDashboard/> Dashboard</Link>
                                    <button  className="  hover:bg-blue-500 w-full flex items-center gap-2  text-white font-semibold p-2 rounded-md"
                                        onClick={logoutHandler}
                                    ><BiLogOut  />Logout</button>
                                </div>
                            </div>
           
                        </div>
                    ) 
                    : 
                    (
                        <div className=" flex">
                            <button className=" p-3 bg-yellow-400 px-6 font-semibold "
                                onClick={() => setShowLoginModal(true)}
                            >
                                Login
                            </button>
                            <Link  href={"/signUp"} prefetch={true}>
                                <button className=" p-3 bg-slate-200 text-black font-semibold">
                                    Start selling
                                </button>
                            </Link>
                        </div>
                    )
                // ) 
                // : 
                // (
                //     <div className="flex items-center pr-5">
                //         <p>Loading...</p>
                //     </div>
                // )
            }
        </div>
    )
}

// sagaradmin@gmail.com 1234