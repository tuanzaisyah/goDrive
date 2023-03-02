import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { format } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiBody } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { SearchContext } from "../context/SearchContext";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState("");
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setOptions(e.target.value);
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, date, options } });
    navigate("/cars", { state: { destination, date, options } });
  };

  return (
    <div className="overflow-hidden">
      <Navbar />
      <div className=" lg:h-[calc(100vh-64px)] h-[calc(100vh-48px)] bg-main-color flex flex-col items-center md:ml-8">
        <div className="w-full xxl:h-96 md:h-80 h-60  bg-white-color-alt p-4 md:pt-10 pt-14">
          <div className="flex justify-center items-center">
            <img
              className="xxl:w-[1100px] md:w-[750px] md:h-auto"
              src="../../assets/img/home.png"
              alt=""
            />
          </div>
        </div>

        <div className="xxl:w-[1300px] lg:w-[950px] md:w-9/12 w-11/12 flex lg:flex-row flex-col items-center lg:gap-2 gap-4 bg-white-color border-2 lg:rounded-full rounded-3xl border-yellow-color lg:p-4 p-6 lg:mt-16 mt-10">
          <div className="w-full flex gap-4 items-center  border border-main-color-alt rounded-full py-3 px-4">
            <HiOutlineLocationMarker className="text-lg main-color-alt" />
            <input
              type="text"
              placeholder="Enter location"
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div className="w-full flex gap-4 items-center  border border-main-color-alt rounded-full py-3 px-4 relative">
            <FaCalendarAlt className="text-lg main-color-alt" />
            <span onClick={() => setOpenDate(!openDate)}>
              {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                date[0].endDate,
                "MM/dd/yyyy"
              )}`}
            </span>
            {openDate && (
              <DateRange
                className="absolute top-10 left-4 z-20"
                editableDateInputs={true}
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
              />
            )}
          </div>
          <div className="w-full flex gap-4 items-center  border border-main-color-alt rounded-full py-3 px-4">
            <BiBody className="text-lg main-color-alt" />

            <select
              className="w-full border-0 outline-none border-main-color-alt rounded-full "
              value={options}
              onChange={handleChange}
            >
              <option value="">Please Select</option>
              <option value="4 seater">4 seater</option>
              <option value="6 seater">6 seater</option>
              <option value="8 seater">8 seater</option>
            </select>
          </div>
          <div className=" ">
            <button className="btn" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>

        <div className="p-4 flex flex-col items-center lg:mt-12 mt-4">
          <h1 className="font-semibold lg:text-4xl text-2xl text-yellow-color text-center mt-4 mb-8">
            Easy & Fast Way to Rent Car
          </h1>
          <p className="text-white-color-alt text-center mb-4">
            Choose a variety of car models for affordable price. Find the
            perfect car for you to enjoy your journey.
          </p>
          <p className="text-white-color-alt text-center mb-12">
            See what we can offer to you. Get your key now!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
