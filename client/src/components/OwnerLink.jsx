import React from "react";
import { BsChat } from "react-icons/bs";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const OwnerLink = ({ owner }) => {
  const { data } = useFetch(`/cars/${owner}`);
  return (
    <div className="flex items-center gap-3">
      {data.map((item) => {
        return (
          <>
            <img
              className="w-10 h-10 rounded-full"
              src={item.profilePic}
              alt=""
            />
            <div>
              <p className="font-medium -mb-2">{item.name}</p>
              <span className="font-light text-xs">@{item.username}</span>
            </div>
            {/* <div className="bg-main-color p-2 rounded-md">
              <Link to={`/chat/${item._id}`}>
                <BsChat className="text-white-color-alt cursor-pointer" />
              </Link>
            </div> */}
          </>
        );
      })}
    </div>
  );
};

export default OwnerLink;
