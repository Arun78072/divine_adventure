import React from "react";

export default function Category() {
  return (
    <div className="max-w-screen-lg mx-auto my-16">
      <h1 className="text-center text-[30px] my-8">We Offer Best Services</h1>
      <div className="flex gap-5 my-5 justify-around">
        <div
          className="box-border w-[250px] h-[254px] bg-[rgba(217,217,217,0.58)] border border-white 
          shadow-[12px_17px_51px_rgba(0,0,0,0.22)] backdrop-blur-[6px] rounded-[17px] text-center 
          cursor-pointer transition-all duration-500 flex items-center justify-center 
          select-none p-3 hover:border-black hover:scale-105 active:scale-95 active:rotate-[1.7deg]"
        >
        <div>
        <h3 className="text-xl">Guided Tours</h3>
         <p className="text-base">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type </p>
        </div>
        </div>
        <div
          className="box-border w-[250px] h-[254px] bg-[rgba(217,217,217,0.58)] border border-white 
          shadow-[12px_17px_51px_rgba(0,0,0,0.22)] backdrop-blur-[6px] rounded-[17px] text-center 
          cursor-pointer transition-all duration-500 flex items-center justify-center 
          select-none p-3 hover:border-black hover:scale-105 active:scale-95 active:rotate-[1.7deg]"
        >
        <div>
        <h3 className="text-xl">Best Flights Options</h3>
         <p className="text-base">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type </p>
        </div>
        </div>
        <div
          className="box-border w-[250px] h-[254px] bg-[rgba(217,217,217,0.58)] border border-white 
          shadow-[12px_17px_51px_rgba(0,0,0,0.22)] backdrop-blur-[6px] rounded-[17px] text-center 
          cursor-pointer transition-all duration-500 flex items-center justify-center 
          select-none p-3 hover:border-black hover:scale-105 active:scale-95 active:rotate-[1.7deg]"
        >
        <div>
        <h3 className="text-xl">Religious Tours</h3>
         <p className="text-base">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type </p>
        </div>
        </div>
        <div
          className="box-border w-[250px] h-[254px] bg-[rgba(217,217,217,0.58)] border border-white 
          shadow-[12px_17px_51px_rgba(0,0,0,0.22)] backdrop-blur-[6px] rounded-[17px] text-center 
          cursor-pointer transition-all duration-500 flex items-center justify-center 
          select-none p-3 hover:border-black hover:scale-105 active:scale-95 active:rotate-[1.7deg]"
        >
        <div>
        <h3 className="text-xl">Medical insurance</h3>
         <p className="text-base">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type </p>
        </div>
        </div>
      </div>
    </div>
  );
}
