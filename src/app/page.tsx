"use client"
import Image from "next/image";
import { HerosectionData } from "./HeroSectionImageData";
import { useContext } from "react";
import { AppContext } from "./context/Appcontext";
import LoginModal from "./components/LoginModal"

export default function Home() {

  const {showLoginModal} = useContext(AppContext);

  return (
    <div className=" p-4">
      <div className=" relative">
        <Image src={"/image/Desktop_sell.webp"} alt="banner" height={600} width={1300}/>

        <div className=" absolute top-[50%]">
          <p className=" lg:text-4xl font-semibold md:text-3xl sm:text-lg">
            Become a Flipkart Seller <br></br>
            and sell to 45+Crore customers
          </p>
        </div>
      </div>


      <div className="flex w-full bg-slate-100 p-4 items-center justify-between max-[950px]:hidden">

        {
          HerosectionData.map((data, i) =>(
            <div key={i} className=" flex items-center gap-5">
              <div  className=" flex flex-col items-center gap-2 md:gap-1">
                <Image  src={data?.image} alt="bannerlogo" height={50} width={50} 
                  className=""
                />
                <p className=" w-[200px] text-center md:w-[150px]">{data?.text}</p>
              </div>
              {
                i!==4 && (
                <div className=" border-2 h-[40px] "></div>
                )
              }
            </div>
          ))
        }

      </div>

      <div className=" flex h-full w-full bg-slate-200 mt-6 justify-between px-6 py-4 max-sm:flex-col-reverse">
        <div className=" flex flex-col lg:w-[40%] gap-8 sm:w-full">
          <p className=" lg:text-3xl md:text-2xl sm:text-lg font-semibold">Help & Support</p>

          <p className=" lg:text-lg md:text-base">
              What sets us apart is our exceptional Flipkart seller support assistance. We prioritise your needs and are committed to providing you with prompt assistance, whether you have questions, doubts, or require any kind of support for your business. Our dedicated team is here to help you every step of the way, ensuring that you have a smooth and successful selling experience on Flipkart. Feel free to reach out to us whenever you need assistance - we're always here to support you.
          </p>
        </div>

        <div className=" pt-10">
            <Image src={"/image/untitled_15_04_1.webp"} alt="untitled" height={350} width={350}/>
        </div>

      </div>

      {
        showLoginModal && (
          <div className=" w-[100vw] h-[100vh] absolute top-0 flex flex-col items-center justify-center bg-opacity-50 bg-slate-100">
            <LoginModal/>
          </div>
        )
      }

    </div>
  );
}
