"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Summer Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600",
    url: "/",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50"
  },
  {
    id: 2,
    title: "Winter Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=600",
    url: "/",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
  {
    id: 3,
    title: "Spring Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/4456815/pexels-photo-4456815.jpeg?auto=compress&cs=tinysrgb&w=600",
    url: "/",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let interval;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrent(prev => (prev === slides.length - 1 ? 0 : prev + 1))
      }, 3000);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="h-[calc(100vh-80px)] overflow-hidden relative">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div className={`${slide.bg} w-screen h-full flex flex-col gap-16 xl:flex-row`} key={slide.id}>
            {/*TEXT CONTAINER*/}
            <div className="h-1/2 xl:w-1/2 xl:h-full flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center">
              <h2 className="text-xl lg:text-3xl 2xl:text-5xl">{slide.description}</h2>
              <h1 className="text-5xl lg:text-6xl 2xl:text-8xl font-semibold">{slide.title}</h1>
              <Link href={slide.url}>
                <button className="rounded-md bg-black text-white py-3 px-4">SHOP NOW</button>
              </Link>
            </div>
            {/*IMAGE CONTAINER*/}
            <div className="h-1/2 xl:w-1/2 xl:h-full relative">
              <Image src={slide.img} alt="" fill sizes="100%" className="object-cover" />
            </div>
          </div>
        ))}
      </div>
      
      {/* Play/Pause Button */}
      <button 
        onClick={togglePlayPause}
        className="absolute top-4 right-4 bg-white/70 hover:bg-white p-2 rounded-full shadow-md z-10 transition-all"
        aria-label={isPlaying ? "Pause slider" : "Play slider"}
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>

      {/* Dots navigation */}
      <div className="absolute m-auto left-1/2 bottom-8 flex gap-4 transform -translate-x-1/2">
        {slides.map((slide, index) => (
          <div 
            className={`w-3 h-3 rounded-full ring-1 ring-Revibe cursor-pointer flex items-center justify-center ${current === index ? "scale-150" : ""}`} 
            key={slide.id} 
            onClick={() => setCurrent(index)}
          >
            {current === index && (<div className="w-[6px] h-[6px] bg-Revibe rounded-full"></div>)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;