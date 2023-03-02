import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="overflow-hidden">
      <Navbar />
      <div className="w-screen lg:h-[calc(100vh-64px)] h-[calc(100vh-48px)]  md:ml-8 flex flex-col justify-center items-center px-4">
        <div className="xl:w-[1000px] md:w-[700px] w-full xl:h-[650px] bg-white-color p-8 rounded-3xl shadow">
          <Link to="/profileEdit">
            <button className="font-semibold text-lg float-right">
              Edit Profile
            </button>
          </Link>

          <div className="flex flex-col justify-center items-center mt-12">
            <img
              className="w-[130px] h-[130px] object-cover rounded-full border display border-grey-color mb-14"
              src={
                user.profilePic ? user.profilePic : "./assets/img/noAvatar.png"
              }
              alt=""
            />
          </div>

          <div className="flex flex-col gap-4 md:px-20 md:mt-8">
            <div className="flex md:flex-row flex-col  gap-4">
              <div className="basis-1/2">
                <p className="font-medium">Name</p>
                <span className="font-light">{user.name}</span>
              </div>
              <div className="basis-1/2">
                <p className="font-medium">Username</p>
                <span className="font-light">{user.username}</span>
              </div>
            </div>
            <div className="flex md:flex-row flex-col gap-4">
              <div className="basis-1/2">
                <p className="font-medium">Email</p>
                <span className="font-light">{user.email}</span>
              </div>
              <div className="basis-1/2">
                <p className="font-medium">Telephone Number</p>
                <span className="font-light">{user.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
