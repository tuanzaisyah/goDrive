import axios from "axios";
import React from "react";
import { useContext } from "react";
import { BiBody, BiTachometer } from "react-icons/bi";
import { FaMoneyCheck } from "react-icons/fa";
import { TbGasStation } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CarOwner = ({ car }) => {
  const { user } = useContext(AuthContext);
  const showToast = (message, type) => {
    const toastType = type === "success" ? toast.success : toast.error;

    toastType(message, {
      position: "top-center",
      autoClose: type === "error" ? 2000 : 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleDelete = async (e) => {
    try {
      await axios.delete(`/cars/${car._id}/${user._id}`);
      showToast("Car deleted successfully", "success");
      window.location.reload();
    } catch (err) {
      showToast("Error in deleting car", "error");
    }
  };

  return (
    <div className="md:flex mb-4 relative">
      {/* display toast */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div className="xl:w-[1200px] md:w-[700px] bg-white-color shadow rounded-md p-4">
        <div className="flex justify-between mb-4">
          <div>
            <h3 className="font-medium">{car?.name}</h3>
            <p className="text-sm">{car?.location}</p>
          </div>
          <div className="flex md:flex-row flex-col gap-4">
            <Link to={`/cars/edit/${car._id}`}>
              <button className="w-24 bg-btn-color-blue py-1 px-4 rounded-full text-btn-color-blue-alt text-center text-sm">
                Edit
              </button>
            </Link>

            <Link>
              <button
                className="w-24 bg-btn-color-red py-1 px-4 rounded-full text-btn-color-red-alt bg-btn-color-red-alt-alt text-center text-sm"
                onClick={handleDelete}
              >
                Delete
              </button>
            </Link>

            <Link to={`/cars/bookingList/${car._id}`}>
              <button className="w-24 bg-main-color-alt py-1 px-4 rounded-full text-white-color-alt  text-center text-sm">
                Booking
              </button>
            </Link>
          </div>
        </div>

        <div className="md:flex xl:gap-24">
          <img
            className="h-auto xl:w-96 md:w-72 w-auto object-cover"
            src={car?.frontPic}
            alt=""
          />

          <div>
            <div className="flex gap-24">
              <div className="mb-4">
                <h3 className="font-medium">Pick Up</h3>
                <p>{car?.pickUpLocation}</p>
              </div>
              <div className="mb-4">
                <h3 className="font-medium">Drop Off</h3>
                <p>{car?.dropOffLocation}</p>
              </div>
            </div>

            <div className="flex gap-16">
              <div className="">
                <div className="flex items-center gap-4 mt-4">
                  <div className="bg-main-color p-2 rounded-full">
                    <BiBody className="text-white-color-alt text-2xl" />
                  </div>
                  <p>{car?.seater}</p>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <div className="bg-main-color p-2 rounded-full">
                    <TbGasStation className="text-white-color-alt text-2xl" />
                  </div>
                  <p>{car?.petrol}</p>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-4 mt-4">
                  <div className="bg-main-color p-2 rounded-full">
                    <BiTachometer className="text-white-color-alt text-2xl" />
                  </div>
                  <p>{car?.transmission}</p>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <div className="bg-main-color p-2 rounded-full">
                    <FaMoneyCheck className="text-white-color-alt text-2xl" />
                  </div>
                  <p>
                    RM {car?.price} <span>/ per day</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarOwner;
