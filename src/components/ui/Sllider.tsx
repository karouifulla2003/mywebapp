"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
const slides =[
{id:1,
 title:"Summer Sale Collections",
 description:"Sale! Up to 50% off!",
 img: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600",
 url:"/",
 bg:"bg-gradient-to-r from-yellow-50 to-pink-50"   
},
{id:2,
    title:"Winter Sale Collections",
    description:"Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=600",
    url:"/",
    bg:"bg-gradient-to-r from-yellow-50 to-pink-50",
},
{id:3,
    title:"Spring Sale Collections",
    description:"Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/4456815/pexels-photo-4456815.jpeg?auto=compress&cs=tinysrgb&w=600",
    url:"/",
    bg:"bg-gradient-to-r from-yellow-50 to-pink-50", 
},





];



const Slider = () => {
  const  [current,setCurrent]=useState(0);
  //useEffect(()=>{
  //const interval= setInterval(() => {

    //setCurrent(prev=>(prev===slides.length-1 ? 0 : prev + 1))
  //},3000)
  //return ()=>clearInterval(interval)
  //},[])

    return (
      <div className="h-[calc(100vh-80px)] overflow-hidden">
        <div className="w-max h-full flex transition-all ease-in-out duration-1000" style={{ transform: `translateX(-${current * 100}vw)` }}
        >
            {slides.map((slides)=>(
                <div className={`${slides.bg} w-screen h-full flex flex-col gap-16 xl:flex-row`} key={slides.id}>

                {/*TEXT CONTAINER*/}
                <div className="h-1/2 xl:w-1/2 xl:h-full flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center">
                    <h2 className="text-xl lg:text-3xl 2xl:text-5xl">{slides.description}</h2>
                    <h1 className="text-5xl lg:text-6xl 2xl:text-8xl font-semibold">{slides.title}</h1>
                    <Link href={slides.url}>
                    <button className="rounded-md bg-black text-white py-3 px-4">SHOP NOW</button>
                    </Link>
                </div>
                {/*IMAGE CONTAINER*/}
                <div className="h-1/2 xl:w-1/2 xl:h-full relative">
                    <Image src={slides.img} alt="" fill sizes="100%" className="object-cover"/>
                </div>
                














                </div>
            ))}
        </div>
        <div className="absolute m-auto left-1/2 bottom-8 flex gap-4">
        {
        slides.map((slides,index) =>(
            <div className={'w-3 h-3 rounded-full ring-1 ring-Revibe cursor-pointer flex items-center justify-center ${current=== index ? "scale-150" :""}'} key={slides.id} onClick={()=>setCurrent(index)}>
             {current === index && (<div className="w-[6px] h-[6px] bg-Revibe rounded-full"></div> )}   
            </div>

    ))}
    </div> 
      </div>
    );
  };
  
  export default Slider