import React from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const Price = ({ item }) => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data } = useFetch(`/bookings/${id}`);

  const price = data.totalDays * item.price;
  return (
    <div>
      <p className="font-medium">RM {price}</p>
    </div>
  );
};

export default Price;
