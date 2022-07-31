import React from "react";
import BannerImg from "../../../assets/images/banner.jpg";

const Banner = () => {
  return (
    <div className='bg-slate-300'>
      <div
        className="hero min-h-screen mb-4"
        style={{ backgroundImage: `url(${BannerImg})` }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-lg">
            <h1 className="mb-5 text-5xl font-bold">Meet With Our Engineers</h1>
            <p className="mb-5 font-thin text-3xl">
              Learn the difference at Our offers
            </p>
            <button className="btn btn-accent">Contact Us</button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-4xl mb-2 font-thin">Corporate Vision Statement</h2>
        <p className="w-5/12 text-2xl text-center decoration-gray-500">We will be the leading provider of quality and innovative industrial repair and maintenance solutions for the U.S. Market while ensuring corporate integrity, employee safety, and customer satisfaction</p>
      </div>
    </div>
  );
};

export default Banner;
