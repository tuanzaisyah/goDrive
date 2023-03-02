import React from "react";
import { useContext } from "react";
import { CarContext } from "../context/CarContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import storage from "../firebase";
import { AuthContext } from "../context/AuthContext";

const AddVehicle = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(CarContext);
  const { user } = useContext(AuthContext);
  const [frontPic, setFrontPic] = useState("");
  const [backPic, setBackPic] = useState("");
  const [interiorPic, setInteriorPic] = useState("");
  const [carDetails, setCarDetails] = useState({});
  const [uploaded, setUploaded] = useState(0);

  const handleChange = (e) => {
    setCarDetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
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
            setCarDetails((prev) => {
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
    dispatch({ type: "ADD_CAR" });

    try {
      const res = await axios.post(`/cars/${user._id}`, carDetails);
      alert("Car successfully added!");
      dispatch({ type: "ADD_CAR_SUCCESS", payload: res.data });
      navigate("/dashboard");
    } catch (err) {
      dispatch({ type: "ADD_CAR_FAILURE", payload: err.response.data });
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
                  placeholder="eg; Perodua Axia"
                  id="name"
                  onChange={handleChange}
                />
              </div>
              <div className="md:basis-1/2 flex flex-col">
                <label className="font-medium">Location</label>
                <input
                  className="border-b"
                  type="text"
                  placeholder="eg; Perak"
                  id="location"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex md:flex-row flex-col gap-4 mb-4">
              <div className="md:basis-1/2 flex flex-col">
                <label className="font-medium">Pick Up Location</label>
                <input
                  className="border-b"
                  type="text"
                  placeholder="eg; Taman Segar, Tanjong Malim"
                  id="pickUpLocation"
                  onChange={handleChange}
                />
              </div>
              <div className="md:basis-1/2 flex flex-col">
                <label className="font-medium">Drop Off Location</label>
                <input
                  className="border-b"
                  type="text"
                  placeholder="eg; Taman Segar, Tanjong Malim"
                  id="dropOffLocation"
                  onChange={handleChange}
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
                    placeholder="eg; 100"
                    id="price"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col lg:basis-1/2">
                  <label className="font-medium">SSM Registration</label>
                  <input
                    className="border-b"
                    type="text"
                    placeholder="eg; 123456789-M"
                    id="ssm"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col lg:basis-1/2">
                  <label className="font-medium">Car Road Tax</label>
                  <input
                    className="border-b"
                    type="text"
                    placeholder="eg; 23 March 2023"
                    id="roadtax"
                    onChange={handleChange}
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
                    <option>Please Select</option>
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
                    <option>Please Select</option>
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
                    <option>Please Select</option>
                    <option value="Manual">Manual</option>
                    <option value="Auto">Auto</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex lg:flex-row flex-col gap-4">
              <div>
                <div>
                  <p className="font-medium">Front car picture</p>
                </div>

                <input
                  type="file"
                  name="frontPic"
                  id="frontPic"
                  onChange={(e) => setFrontPic(e.target.files[0])}
                />
                <img
                  className="mt-8 rounded-sm shadow w-auto h-48 object-cover"
                  src={frontPic ? URL.createObjectURL(frontPic) : ""}
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
                  src={backPic ? URL.createObjectURL(backPic) : ""}
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
                  src={interiorPic ? URL.createObjectURL(interiorPic) : ""}
                  alt=""
                />
              </div>
            </div>
            <p className="text-xs font-semibold mt-2">
              Important! Please upload front car picture and back car picture
              with no background. Click <span className="underline">here</span>{" "}
              for example
            </p>
            <div className="opacity-0 hover:opacity-100 ease-in-out duration-200 w-96 bg-white-color alt p-4 rounded-lg shadow-md text-main-color-alt absolute right-[550px] ">
              <h3 className="font-medium text-lg text-center mb-4">
                Example Car picture
              </h3>

              <div className="flex">
                <div>
                  <p>
                    <img src="./assets/img/axia1.png" alt="" />
                  </p>
                  <p className="text-sm mt-2 text-center">Front Car Picture</p>
                </div>
                <div>
                  <p>
                    <img src="./assets/img/axia2.png" alt="" />
                  </p>
                  <p className="text-sm mt-2 text-center">Back Car Picture</p>
                </div>
              </div>
            </div>
          </form>

          <div className="flex justify-end">
            {uploaded === 3 ? (
              <button className="btn w-36 py-[5px] mt-8" onClick={handleSubmit}>
                Add Car
              </button>
            ) : (
              <button className="btn w-36 py-[5px] mt-8" onClick={handleUpload}>
                Upload
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVehicle;
