import axios from "axios";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { CarContext } from "../context/CarContext";
import storage from "../firebase";
import useFetch from "../hooks/useFetch";

const EditVehicle = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { car, dispatch } = useContext(CarContext);
  const id = location.pathname.split("/")[3];
  const { data } = useFetch(`/cars/find/${id}`);
  const [carInfo, setCarInfo] = useState({});
  const [frontPic, setFrontPic] = useState("");
  const [backPic, setBackPic] = useState("");
  const [interiorPic, setInteriorPic] = useState("");
  const [uploaded, setUploaded] = useState(0);

  const handleChange = (e) => {
    setCarInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Upload image to firebase
  const upload = (item) => {
    item.forEach((item) => {
      // rename file name
      const fileName = new Date().getTime() + item.label + item.file.name;
      // create directory in firebase storage and upload image
      const uploadTask = storage.ref(`/cars/${fileName}`).put(item.file);
      // show upload progress in cl
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is" + progress + " % done.");
        },
        (err) => {
          console.log(err);
        },
        // get image link from firebase storage
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setCarInfo((prev) => {
              return { ...prev, [item.label]: url };
            });
            // calculate file uploaded
            setUploaded((prev) => prev + 1);
            // alert("Picture successfully upload");
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: frontPic, label: "frontPic" },
      { file: backPic, label: "backPic" },
      { file: interiorPic, label: "interiorPic" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "CAR_UPDATE_START" });

    try {
      const res = await axios.put(`/cars/${data._id}`, carInfo);
      dispatch({ type: "CAR_UPDATE_SUCCESS", payload: res.data });
      navigate("/dashboard");
    } catch (err) {
      dispatch({ type: "CAR_UPDATE_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="">
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        <div className=" bg-white-color shadow rounded-lg  p-4 md:ml-20 mt-8 mx-4">
          <form className="">
            <div className="flex md:flex-row flex-col gap-4 mb-4">
              <div className="md:basis-1/2 flex flex-col">
                <label className="font-medium">Vehicle Name</label>
                <input
                  className="border-b"
                  type="text"
                  id="name"
                  onChange={handleChange}
                  placeholder={data.name}
                />
              </div>
              <div className="md:basis-1/2 flex flex-col">
                <label className="font-medium">Location</label>
                <input
                  className="border-b"
                  type="text"
                  id="location"
                  onChange={handleChange}
                  placeholder={data.location}
                />
              </div>
            </div>

            <div className="flex md:flex-row flex-col gap-4 mb-4">
              <div className="md:basis-1/2 flex flex-col">
                <label className="font-medium">Pick Up Location</label>
                <input
                  className="border-b"
                  type="text"
                  id="pickUpLocation"
                  onChange={handleChange}
                  placeholder={data.pickUpLocation}
                />
              </div>
              <div className="md:basis-1/2 flex flex-col">
                <label className="font-medium">Drop Off Location</label>
                <input
                  className="border-b"
                  type="text"
                  id="dropOffLocation"
                  onChange={handleChange}
                  placeholder={data.dropOffLocation}
                />
              </div>
            </div>

            <div className="flex md:flex-row flex-col gap-4 lg:mb-6 mb-4">
              <div className="flex flex-col lg:flex-row lg:basis-1/2 gap-4 ">
                <div className="flex flex-col lg:basis-1/2">
                  <label className="font-medium">Price (Per Day )</label>
                  <input
                    className="border-b"
                    type="text"
                    id="price"
                    onChange={handleChange}
                    placeholder={data.price}
                  />
                </div>
                <div className="flex flex-col lg:basis-1/2">
                  <label className="font-medium">SSM Registration</label>
                  <input
                    className="border-b"
                    type="text"
                    id="ssm"
                    onChange={handleChange}
                    placeholder={data.ssm}
                  />
                </div>
                <div className="flex flex-col lg:basis-1/2">
                  <label className="font-medium">Car Road Tax</label>
                  <input
                    className="border-b"
                    type="text"
                    id="roadtax"
                    onChange={handleChange}
                    placeholder={data.roadtax}
                  />
                </div>
                <div className="flex flex-col lg:basis-1/2">
                  <label className="font-medium mb-1">Petrol Type</label>
                  <select
                    className="border rounded-full py-1 px-2 cursor-pointer"
                    name="petrol"
                    id="petrol"
                    onChange={handleChange}
                  >
                    <option value="">Please Select</option>
                    <option value="Ron 95">Ron 95</option>
                    <option value="Ron 97">Ron 97</option>
                    <option value="Diesel">Diesel</option>
                  </select>
                </div>
              </div>

              <div className="flex md:flex-row flex-col lg:basis-1/2 gap-4 ">
                <div className="flex flex-col lg:basis-1/2">
                  <label className="font-medium mb-1">Seater</label>
                  <select
                    className="border rounded-full py-1 px-2 cursor-pointer"
                    name="seater"
                    id="seater"
                    onChange={handleChange}
                  >
                    <option value="">Please Select</option>
                    <option value="4 seater">2 - 4 Seater</option>
                    <option value="6 seater">2 - 6 Seater</option>
                    <option value="8 seater">2 - 8 Seater</option>
                  </select>
                </div>
                <div className="flex flex-col lg:basis-1/2">
                  <label className="font-medium mb-1">Transmission</label>
                  <select
                    className="border rounded-full py-1 px-2 cursor-pointer"
                    name="transmission"
                    id="transmission"
                    onChange={handleChange}
                  >
                    <option value="">Please Select</option>
                    <option value="Manual">Manual</option>
                    <option value="Auto">Auto</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex lg:flex-row flex-col gap-4">
              <div>
                <p className="font-medium">Front car picture</p>
                <input
                  type="file"
                  name="frontPic"
                  id="frontPic"
                  onChange={(e) => setFrontPic(e.target.files[0])}
                />
                <img
                  className="mt-8 rounded-sm shadow w-auto h-48 object-cover"
                  src={frontPic ? URL.createObjectURL(frontPic) : data.frontPic}
                  alt=""
                />
              </div>

              <div>
                <p className="font-medium">Back car picture</p>
                <input
                  type="file"
                  name="backPic"
                  id="backPic"
                  onChange={(e) => setBackPic(e.target.files[0])}
                />
                <img
                  className="mt-8 rounded-sm shadow w-auto h-48 object-cover"
                  src={backPic ? URL.createObjectURL(backPic) : data.backPic}
                  alt=""
                />
              </div>

              <div>
                <p className="font-medium">Interior picture</p>
                <input
                  type="file"
                  name="interiorPic"
                  id="interiorPic"
                  onChange={(e) => setInteriorPic(e.target.files[0])}
                />
                <img
                  className="mt-8 rounded-sm shadow w-auto h-48 object-cover"
                  src={
                    interiorPic
                      ? URL.createObjectURL(interiorPic)
                      : data.interiorPic
                  }
                  alt=""
                />
              </div>
            </div>
          </form>

          <div className="flex justify-end">
            {uploaded === 3 ? (
              <button
                className="btn w-36 py-[5px] mt-8 hidden"
                onClick={handleUpload}
              >
                Upload
              </button>
            ) : (
              <button className="btn w-36 py-[5px] mt-8" onClick={handleUpload}>
                Upload
              </button>
            )}

            <button
              className="btn w-36 py-[5px] mt-8 ml-4"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditVehicle;
