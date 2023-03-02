import React from "react";
import { GiRoundStar } from "react-icons/gi";
import { Link } from "react-router-dom";

const Car = ({ item }) => {
  return (
    <div className="flex items-center ">
      <div className="lg:w-[500px] md:w-[300px] w-[350px] max-h-[250px] bg-white-color rounded-2xl shadow p-6 relative">
        <h3 className="font-medium -mb-2">{item.name}</h3>
        <span className="text-xs">Owner's name</span>

        {/* <div className="flex gap-2 text-yellow-color text-lg mt-2">
          <GiRoundStar />
          <GiRoundStar />
          <GiRoundStar />
          <GiRoundStar />
          <GiRoundStar />
        </div> */}

        <p className="font-medium mt-6">
          {item.price} <span>/ per day</span>
        </p>

        <img
          className="lg:w-80 w-56 max-w-[380px] h-auto absolute lg:-translate-y-36 -translate-y-28 xxxl:translate-x-64 lg:translate-x-56 md:translate-x-28 translate-x-36"
          src={item.frontPic}
          alt=""
        />

        <div className="mt-8 flex gap-2">
          <Link to={`/cars/${item._id}`}>
            <button className="btn-alt lg:text-base text-sm  py-[5px] lg:px-8 px-4">
              Details
            </button>
          </Link>
          {/* <button className="btn lg:text-base text-sm py-[5px] lg:px-8 px-4">
            Book Now
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Car;
