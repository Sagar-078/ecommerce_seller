"use client"
import Link from "next/link";
import { sidebarManu } from "./sidebarManu";
import { usePathname } from "next/navigation";
import {BiLogOut} from 'react-icons/bi'
import { useContext } from "react";
import { AppContext } from "../context/Appcontext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Sidebar =() => {

    const pathname = usePathname();
    const {setAuthToken, setAuthUser, setShowLoginModal} = useContext(AppContext);
    const router = useRouter();

    function logoutHandler(){
        localStorage.clear();
        setAuthToken(null);
        setAuthUser(null);
        setShowLoginModal(false);
        router.push("/");
        toast.success("Logout successfully");
    }

    return(
        <div className=" w-full h-full bg-slate-400">
            <div className=" border-b-2">
                {
                    sidebarManu.map((data, i) => {
                        const Icon = data.icon;
                        return(
                            <Link href={data.link} prefetch={true} key={i}>
                                <div className={`flex items-center gap-2 p-4 cursor-pointer hover:bg-slate-500 ${pathname === data.link ? " bg-yellow-400" : ""}`}>
                                    <Icon/>
                                    <p>{data.name}</p>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>

            <div className=" w-full">
                <button  onClick={logoutHandler}
                    className=" w-full flex items-center gap-2 p-4 hover:bg-slate-500 cursor-pointer">
                    <BiLogOut/>
                    Logout
                </button>
            </div>

        </div>
    )

}

export default Sidebar;