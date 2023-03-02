import React, { useState } from "react";
import Car from "../components/Car";
import Navbar from "../components/Navbar";
import useFetch from "../hooks/useFetch.js";
import { format } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiBody } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const CarList = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const { data, loading, error, reFetch } = useFetch(
    `/cars?location=${destination}&seater=${options}`
  );

  const handleChange = (e) => {
    setOptions(e.target.value);
  };

  const handleClick = () => {
    reFetch();
  };

  return (
    <div className="container">
      <Navbar />

      <div className="flex items-center justify-center">
        <div className="lg:w-[950px] md:w-9/12 w-11/12 flex lg:flex-row flex-col items-center lg:gap-2 gap-4 bg-white-color border-2 lg:rounded-full rounded-3xl border-yellow-color lg:p-4 p-6 lg:mt-16 mt-10">
          <div className="w-full flex gap-4 items-center  border border-main-color-alt rounded-full py-3 px-4">
            <HiOutlineLocationMarker className="text-lg main-color-alt" />
            <input
              type="text"
              placeholder={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          {/* <div className="w-full flex gap-4 items-center  border border-main-color-alt rounded-full py-3 px-4 relative">
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
          </div> */}
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
            <button className="btn" onClick={handleClick}>
              Search
            </button>
          </div>
        </div>
      </div>
      <div className=" md:ml-16 md:grid xxl:grid-cols-[repeat(3,1fr)] md:grid-cols-[repeat(2,1fr)] flex flex-col lg:gap-10 md:gap-6 gap-4 px-4 mt-12 ">
        {loading ? (
          "Loading"
        ) : (
          <>
            {data.map((item) => (
              <Car item={item} key={item._id} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CarList;
