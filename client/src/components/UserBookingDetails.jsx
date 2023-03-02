import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import UserRatings from "./UserRatings";
import { SlArrowDown } from "react-icons/sl";

const UserBookingDetails = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data } = useFetch(`/bookings/booking/${id}`);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="basis-2/3">
      <div className="">
        {data?.map((user) => {
          return (
            <>
              <div key={user._id}>
                <div className="flex justify-between">
                  <h1 className="font-semibold text-lg mb-4">
                    Customer Details
                  </h1>

                  <Link to={`/rateUser/${user._id}`}>
                    <button className="rounded-lg p-1 text-center w-24 bg-main-color-alt text-white-color-alt ">
                      Rate User
                    </button>
                  </Link>
                </div>

                <div className="flex justify-center">
                  <img
                    className="lg:w-32 lg:h-32 w-24 h-24 rounded-full border border-grey-color text-center mb-8"
                    src={
                      user ? user?.profilePic : "../../assets/img/noAvatar.png"
                    }
                    alt=""
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex gap-2">
                    <div className="basis-1/2">
                      <p className="font-medium">Name</p>
                      <span>{user?.name}</span>
                    </div>
                    <div className="">
                      <p className="font-medium">Username</p>
                      <span>@{user?.username}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="basis-1/2">
                      <p className="font-medium">Email</p>
                      <span>{user?.email}</span>
                    </div>
                    <div>
                      <p className="font-medium">Telephone Number</p>
                      <span>{user?.phone}</span>
                    </div>
                  </div>
                </div>
                <button
                  className="rounded-full px-2 py-1 font-medium text-center w-60 border border-main-color-alt text-main-color-alt my-8 flex gap-4 items-center justify-center"
                  onClick={() => setOpenModal(true)}
                >
                  Show User Ratings <SlArrowDown />
                </button>
              </div>
            </>
          );
        })}
      </div>
      {openModal && <UserRatings setOpen={setOpenModal} userId={data[0]._id} />}
    </div>
  );
};

export default UserBookingDetails;
