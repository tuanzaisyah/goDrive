import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

const PanelHistory = ({ item }) => {
  const { user } = useContext(AuthContext);
  const { data } = useFetch(`/bookings/car/${item._id}`);

  return (
    <>
      <div
        className={`xxxl:w-3/4 lg:w-4/5 flex justify-between bg-white-color shadow rounded-lg p-4 mb-4 [&.Pending]:hidden [&.Upcoming]:hidden ${item.status}`}
      >
        <div>
          <div className="flex flex-col gap-4 mb-4">
            <h3 className="font-medium">{data[0]?.name}</h3>
            <p className="font-light text-xs -mt-4">{item._id}</p>
          </div>

          <h3 className="mb-4">
            <b className="font-medium">Name:</b> {user.name}
          </h3>

          <div className="lg:flex lg:gap-24">
            <div className="mb-4">
              <h3 className="font-medium mb-1">Pick Up</h3>
              <div className="md:flex md:gap-8">
                <p>{data[0]?.pickUpLocation}</p>
                <p>{new Date(item?.pickUpDate).toDateString()}</p>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-1">Drop Off</h3>
              <div className="md:flex md:gap-8">
                <p>{data[0]?.dropOffLocation}</p>
                <p>{new Date(item?.dropOffDate).toDateString()}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p
            className={`[&.Pending]:bg-grey-color-alt [&.Pending]:text-grey-color [&.Upcoming]:bg-btn-color-green [&.Upcoming]:text-btn-color-green-alt [&.Declined]:bg-btn-color-red [&.Declined]:text-btn-color-red-alt [&.Finished]:bg-btn-color-red [&.Finished]:text-btn-color-red-alt text-center py-.5 px-4 rounded-full text-sm ${item.status}`}
          >
            {item.status}
          </p>
          <Link to={`/rateCar/${data[0]?._id}`}>
            <button
              className={`btn py-[5px] text-sm cursor-pointer [&.Pending]:hidden [&.Declined]:hidden [&.Upcoming]:hidden ${item.status}`}
            >
              Rate
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PanelHistory;
