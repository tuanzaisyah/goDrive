import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import CarOwner from "../components/CarOwner";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { data, loading } = useFetch(`/users/car/${user._id}`);
  return (
    <div>
      <Navbar />
      <div className="md:ml-16 mt-8 p-4">
        <h3 className="text-lg">
          Hi <span className="font-medium">{user.name}</span>, welcome to
          GoDrive dashboard
        </h3>

        <div className="flex gap-8">
          <Link to="/addVehicle">
            <button className="btn mt-3 text-sm">Add Vehicle</button>
          </Link>
        </div>
        <div className="flex flex-col items-center mt-8">
          {loading ? (
            "loading"
          ) : (
            <>
              {data.map((car) =>
                car ? <CarOwner car={car} key={car._id} /> : null
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
