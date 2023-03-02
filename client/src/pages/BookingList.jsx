import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const BookingList = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  // fetch booking list data
  const { data } = useFetch(`/cars/bookings/${id}`);
  const { user } = useContext(AuthContext);

  // fetch car details
  const [carData, setCarData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchCar = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/cars/find/${id}`);
        setCarData(res.data);
      } catch (err) {
        setError(false);
      }
      setLoading(false);
    };
    fetchCar();
  }, [carData]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 230,
      renderCell: (params) => {
        return <div>{params.row._id}</div>;
      },
    },
    {
      field: "totalDays",
      headerName: "Total Booking Day",
      width: 170,
      renderCell: (params) => {
        return <div>{params.row.totalDays}</div>;
      },
    },
    {
      field: "pickUpDate",
      headerName: "Pick Up Date",
      width: 200,
      renderCell: (params) => {
        return <div>{new Date(params.row.pickUpDate).toDateString()}</div>;
      },
    },
    {
      field: "dropOffDate",
      headerName: "Drop Off Date",
      width: 200,
      renderCell: (params) => {
        return <div>{new Date(params.row.dropOffDate).toDateString()}</div>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        return (
          <div
            className={`rounded-full py-1 px-2 text-center w-24 [&.Pending]:text-grey-color-alt [&.Upcoming]:text-btn-color-green-alt  [&.Declined]:text-btn-color-red-alt [&.Finished]:text-btn-color-red-alt ${params.row.status}`}
          >
            {params.row.status}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 450,
      renderCell: (params) => {
        return (
          <div className="flex gap-2">
            <Link to={`/bookingDetails/${params.row._id}`}>
              <button className="rounded-full py-1 px-2 text-center w-24 bg-btn-color-blue text-btn-color-blue-alt">
                View
              </button>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="md:ml-20 mt-8 mx-4">
        <h1 className="text-lg mb-4">
          Hi <span className="font-medium">{user.name}</span>, below are the
          booking list for <span className="font-medium">{carData?.name}</span>
        </h1>
        <div className="bg-white-color shadow-sm rounded-lg ">
          <div className="h-[850px] w-full">
            <DataGrid
              rows={data}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              getRowId={(row) => row._id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingList;
