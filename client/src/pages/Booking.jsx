import React from "react";
import { useContext } from "react";
import Navbar from "../components/Navbar";
import PanelBooking from "../components/PanelBooking";
import { AuthContext } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";

const Booking = () => {
  const { user } = useContext(AuthContext);
  const { data, loading } = useFetch(`/users/booking/${user._id}`);
  return (
    <div className="">
      <Navbar />
      <div className="flex flex-col lg:items-center md:ml-16 my-8 px-4">
        {loading ? (
          "Loading"
        ) : (
          <>
            {/*sort data then map */}
            {data
              .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
              .map((item) => (
                <PanelBooking item={item} key={item._id} />
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Booking;
