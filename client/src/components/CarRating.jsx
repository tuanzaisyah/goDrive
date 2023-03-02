import React from "react";
import { GiRoundStar } from "react-icons/gi";

const CarRating = ({ rating }) => {
  return (
    <div className="md:w-[400px] border-b border-grey-color p-4 my-1">
      <div className="flex items-center gap-4">
        <img
          className=" w-8 h-8 rounded-lg text-center border border-grey-color"
          src={rating ? rating?.profilePic : "./assets/img/noAvatar.png"}
          alt=""
        />
        <div className="flex flex-col">
          <p className="text-light text-xs mb-2">@{rating?.username}</p>

          <div className="flex gap-2 text-yellow-color text-lg">
            <img
              src="../../assets/emoji/bad.png"
              alt=""
              className={`w-8 [&.fair]:hidden [&.good]:hidden ${rating?.rating}`}
            />
            <img
              src="../../assets/emoji/fair.png"
              alt=""
              className={`w-8 [&.bad]:hidden [&.good]:hidden ${rating?.rating}`}
            />
            <img
              src="../../assets/emoji/good.png"
              alt=""
              className={`w-8 [&.fair]:hidden [&.bad]:hidden ${rating?.rating}`}
            />
          </div>
        </div>
      </div>
      <p className="mt-2 text-justify text-sm">{rating?.comment}</p>
    </div>
  );
};

export default CarRating;
