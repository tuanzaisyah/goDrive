import React, { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import { BsChat } from "react-icons/bs";
import { BiBody, BiTachometer } from "react-icons/bi";
import { TbGasStation } from "react-icons/tb";
import { FaMoneyCheck } from "react-icons/fa";
import { AiFillInfoCircle } from "react-icons/ai";
import CarRating from "../components/CarRating";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { SearchContext } from "../context/SearchContext";
import { AuthContext } from "../context/AuthContext";
import { BookingContext } from "../context/BookingContext";
import axios from "axios";
import { useState } from "react";
import CarRatings from "../components/CarRatings";
import OwnerLink from "../components/OwnerLink";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CarDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { user } = useContext(AuthContext);
  const { data, loading } = useFetch(`/cars/find/${id}`);
  const { dispatch } = useContext(BookingContext);

  // // fetch owner's data
  // const [ownerData, setOwnerData] = useState();
  // const [loading1, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  // useEffect(() => {
  //   const fetchOwner = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await axios.get(`/cars/${data._id}`);
  //       setOwnerData(res.data);
  //     } catch (err) {
  //       setError(false);
  //     }
  //     setLoading(false);
  //   };
  //   fetchOwner();
  // }, [ownerData]);

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

  const { date } = useContext(SearchContext);

  // calculate days for total price
  const MILISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILISECONDS_PER_DAY);
    return diffDays;
  }

  // console.log(dayDifference(date[0].endDate, date[0].startDate));
  const days = dayDifference(date[0].endDate, date[0].startDate);
  // get start date
  const start = date[0].startDate;
  // get end date
  const end = date[0].endDate;
  // get price per day
  const rate = data.price;
  // calculate total price
  const amount = parseInt(days) * parseInt(rate);

  // get insurance
  const [checked, setChecked] = useState({});
  // calculate total price + insurance
  const [total, setTotal] = useState(0);
  const handleCheckbox = (e) => {
    const value = e.target.value;
    const price = data.price;

    if (e.target.checked) {
      setChecked(value);
      setTotal(
        (total) => total + parseInt(value) + parseInt(days) * parseInt(price)
      );
    } else {
      setTotal(
        (total) => total - parseInt(value) - parseInt(days) * parseInt(price)
      );
    }
  };

  // get input for db
  const [input] = useState({
    totalDays: days,
    totalPrice: rate,
    pickUpDate: start,
    dropOffDate: end,
    insurans: data.price,
  });

  console.log(input, data.price);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "ADD_BOOKING" });

    try {
      const res = await axios.post(`/bookings/${data._id}/${user._id}`, input);
      showToast("Booking success", "success");
      dispatch({ type: "ADD_BOOKING_SUCCESS", payload: res.data });
      setTimeout(() => {
        navigate("/upcoming");
      }, 3000);
    } catch (err) {
      dispatch({ type: "ADD_BOOKING_FAILURE", payload: err.response.data });

      showToast("Booking error", "error");
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

      {loading ? (
        "Loading"
      ) : (
        <>
          <div className="lg:flex lg:gap-4 md:ml-20 mx-4 my-10">
            <div className="lg:basis-2/3 bg-white-color shadow p-6 rounded-3xl">
              <div className="flex justify-between">
                <h3 className="font-medium text-lg">{data.name}</h3>
                <OwnerLink owner={data._id} />
              </div>

              <div className="flex md:flex-row flex-col xl:justify-center items-center gap-4 mt-8">
                <img
                  className="md:h-[530px] h-64 xxl:w-[550px] md:w-96 w-72 object-contain bg-grey-color rounded-lg"
                  src={data?.frontPic}
                  alt=""
                />
                <div className="flex flex-col gap-4">
                  <img
                    className="h-64 md:w-80 xxl:w-96 w-72 object-contain bg-grey-color rounded-lg"
                    src={data?.backPic}
                    alt=""
                  />
                  <img
                    className="h-64 md:w-80 xxl:w-96 w-72 object-cover bg-grey-color rounded-lg"
                    src={data?.interiorPic}
                    alt=""
                  />
                </div>
              </div>

              <div className="lg:flex lg:justify-center lg:items-center lg:gap-4 mt-8">
                <div className="lg:basis-2/5 flex flex-col gap-4">
                  <div>
                    <h3 className="font-medium text-lg mb-2">
                      Car Specification
                    </h3>
                    <div className="flex lg:flex-col md:flex-row lg:gap-0 md:gap-24 flex-col ">
                      <div className="">
                        <div className="flex items-center gap-4 mt-4">
                          <div className="bg-main-color p-2 rounded-full">
                            <BiBody className="text-white-color-alt text-2xl" />
                          </div>
                          <p>{data.seater}</p>
                        </div>
                        <div className="flex items-center gap-4 mt-4">
                          <div className="bg-main-color p-2 rounded-full">
                            <TbGasStation className="text-white-color-alt text-2xl" />
                          </div>
                          <p>{data.petrol}</p>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-4 mt-4">
                          <div className="bg-main-color p-2 rounded-full">
                            <BiTachometer className="text-white-color-alt text-2xl" />
                          </div>
                          <p>{data.transmission}</p>
                        </div>
                        <div className="flex items-center gap-4 mt-4">
                          <div className="bg-main-color p-2 rounded-full">
                            <FaMoneyCheck className="text-white-color-alt text-2xl" />
                          </div>
                          <p>
                            RM {data.price} <span>/ per day</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">
                      Business Registration
                    </h3>
                    <div>
                      <p className="font-medium ">SSM Registration Number</p>
                      <span>{data.ssm}</span>
                      <p className="font-light text-sm">
                        Check for validation{" "}
                        <a
                          className="underline"
                          href="https://www.ssm.com.my/Pages/e-Search.aspx"
                          target="_blank"
                        >
                          here
                        </a>
                      </p>
                    </div>
                    <div className="mt-2">
                      <h3 className="font-medium">Car Roadtax</h3>
                      <p>{data.roadtax}</p>
                    </div>
                  </div>
                </div>

                <CarRatings item={data} />
              </div>
            </div>
            <div className="lg:basis-1/3 flex flex-col item-center bg-white-color shadow-sm rounded-lg p-6 lg:mt-0 mt-8">
              <h1 className="font-semibold text-2xl text-center">
                Booking Details
              </h1>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1 mt-8">
                  <p className="font-medium">Location</p>
                  <p>{data.location}</p>
                </div>
                <div>
                  <p className="font-medium">Pick Up</p>
                  <p>{data.pickUpLocation}</p>
                  <p></p>
                </div>
                <div>
                  <p className="font-medium">Drop Off</p>
                  <p>{data.dropOffLocation}</p>
                  <p></p>
                </div>
                <div>
                  <p className="font-medium">Price</p>
                  <div className="flex justify-between">
                    <p>
                      {days} day x RM {data.price}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="font-medium">Insurance (Damage Waiver)</p>
                  <div className="flex items-center gap-4 relative">
                    <input
                      type="checkbox"
                      name="insurance"
                      id="insurance"
                      value={10}
                      onChange={handleCheckbox}
                    />
                    <label htmlFor=""> + RM 10</label>

                    <AiFillInfoCircle className="text-main-color-alt text-lg cursor-pointer group" />

                    <div className="opacity-0 hover:opacity-100 ease-in-out duration-200 w-80 bg-white-color alt p-4 rounded-lg shadow-md text-main-color-alt absolute left-28">
                      <h3 className="font-medium text-lg text-center mb-4">
                        Car Damage Waiver
                      </h3>

                      <p>
                        <span className="font-medium">RM 3000</span> max payable
                        limit
                      </p>
                      <p className="font-light text-sm mt-2">
                        Get protected against collision when using GoDrive.{" "}
                        <span className="underline cursor-pointer">
                          Terms & Condition
                        </span>{" "}
                        applied.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-b-[1px] border-black-color my-8"></div>
              <div className="flex justify-between mb-8">
                <h3 className="font-semibold text-2xl">Total</h3>
                {total ? (
                  <h3 className="font-semibold text-2xl">RM {total}</h3>
                ) : (
                  <h3 className="font-semibold text-2xl">
                    RM {days * data.price}
                  </h3>
                )}
              </div>
              <button className="btn text-xl xl:mx-24" onClick={handleSubmit}>
                Book Now
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CarDetails;
