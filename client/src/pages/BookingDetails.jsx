import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Price from "../components/Price";
import UserBookingDetails from "../components/UserBookingDetails";
import { AuthContext } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookingDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data } = useFetch(`/bookings/${id}`);
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

  // fetch car details
  const [carData, setCarData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchCar = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/bookings/car/${id}`);
        setCarData(res.data);
      } catch (err) {
        setError(false);
      }
      setLoading(false);
    };
    fetchCar();
  }, [carData]);

  const [approve] = useState({ status: "Upcoming" });
  const [decline] = useState({ status: "Declined" });
  const [finish] = useState({ status: "Finished" });

  const handleApprove = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`/bookings/${id}`, approve);
      showToast("Booking approved!", "success");
      setTimeout(async () => {
        await navigate(-1); // Wait for navigation to complete
      }, 3000);
    } catch (err) {
      showToast("Error to update booking status", "error");
    }
  };

  const handleDecline = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`/bookings/${id}`, decline);
      showToast("Booking Declined!", "success");
      setTimeout(async () => {
        await navigate(-1); // Wait for navigation to complete
      }, 3000);
    } catch (err) {
      showToast("Error to update booking status", "error");
    }
  };
  const handleFinish = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`/bookings/${id}`, finish);
      showToast("Booking finished!", "success");
      setTimeout(async () => {
        await navigate(-1); // Wait for navigation to complete
      }, 3000);
    } catch (err) {
      showToast("Error to update booking status", "error");
    }
  };

  return (
    <div>
      <Navbar />

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

      <div className="flex flex-col justify-center items-center md:ml-16 mt-8 mx-4">
        <div className="xxl:w-3/5 md:w-5/6 flex flex-col gap-8 bg-white-color rounded-lg xxl:p-8 p-4">
          <div className="flex gap-2 justify-end">
            <button
              className="rounded-full p-1 text-sm text-center w-24 bg-btn-color-green text-btn-color-green-alt"
              onClick={handleApprove}
            >
              Approve
            </button>
            <button
              className="rounded-full p-1 text-sm text-center w-24 bg-btn-color-red text-btn-color-red-alt"
              onClick={handleDecline}
            >
              Decline
            </button>
            <button
              className="rounded-full p-1 text-sm text-center w-24 bg-btn-color-blue text-btn-color-blue-alt"
              onClick={handleFinish}
            >
              Finish
            </button>
          </div>
          <div className="lg:flex">
            <div className="basis-1/3">
              <div>
                {carData?.map((item) => {
                  return (
                    <h1 className="font-semibold text-lg mb-4" key={item._id}>
                      Booking Details -<span>{item.name}</span>
                    </h1>
                  );
                })}
              </div>

              <div className="flex flex-col md:gap-8 gap-4">
                <div className="lg:flex-col lg:gap-8 md:flex ">
                  <div className="flex flex-col md:basis-1/2 gap-2">
                    <h3 className="font-medium">Pick Up</h3>
                    {carData?.map((item) => {
                      return <p key={item._id}>{item?.pickUpLocation}</p>;
                    })}
                    <p>{new Date(data.pickUpDate).toDateString()}</p>
                  </div>

                  <div className="flex flex-col md:basis-1/2 gap-2">
                    <h3 className="font-medium">Drop Off</h3>
                    {carData?.map((item) => {
                      return <p key={item._id}>{item?.dropOffLocation}</p>;
                    })}
                    <p>{new Date(data.dropOffDate).toDateString()}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-medium">Total Price</h3>
                  <p>
                    {data.totalDays} day x
                    {carData?.map((item) => {
                      return <span key={item._id}> RM {item?.price}</span>;
                    })}
                  </p>
                  <div className="flex lg:gap-24 md:gap-12 gap-32">
                    <p className="font-medium">TOTAL</p>
                    {carData?.map((item) => (
                      <Price item={item} key={item._id} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:border-r lg:mx-8 border-b my-8"></div>

            <UserBookingDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
