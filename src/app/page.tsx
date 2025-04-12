"use client";
import Banner from "@/components/layout/Banner";
import CatagoryList from "@components/product/CatagoryList"
import Slider from "@components/ui/Sllider"
import { useEffect } from "react"
const HomePage = () => {

  useEffect(()=>{
    const fetchData = async () => {
      const data = await fetch('/api/posts');
      const response = await data.json();
      console.log(response);
    };
    fetchData();
   },[])     
  return (
    <>
      <div className="container">
        <div className="item">item 1</div>
        <div className="item">item 2</div>
        <div className="item">item 3</div>
      </div>
    
      <div className=''>
        <Slider/>

        <div className="mt-24">
          <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 mb-12">Catagories</h1>
        <CatagoryList/>
        </div>
        <div className="w-full h-full ">
        <Banner/>
        </div>
      </div>
    </>
  )
}

export default HomePage