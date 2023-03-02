import React from "react";
import useFetch from "../hooks/useFetch";
import CarRating from "./CarRating";

const CarRatings = ({ item }) => {
  const { data } = useFetch(`/cars/car/${item._id}`);

  return (
    <div className="lg:basis-3/5 mt-8 overflow-y-scroll sticky scrollbar h-96 shadow-lg p-4 rounded-lg">
      <h3 className="font-medium text-lg mb-4">Rating & Review</h3>

      {data
        .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
        .map((rating) => {
          return <CarRating rating={rating} key={rating._id} />;
        })}
    </div>
  );
};

export default CarRatings;
