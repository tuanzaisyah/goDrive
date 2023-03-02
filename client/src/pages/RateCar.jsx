import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

const RateCar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState({
    username: user.username,
    profilePic: user.profilePic,
  });

  const handleChange = (e) => {
    setRating((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/ratings/find/${id}`, rating);
      alert("Rating added!");
      navigate("/home");
    } catch (err) {}
  };
  return (
    <div>
      <Navbar />
      <div className=" w-screen h-screen flex justify-center items-center">
        <div className="xl:w-[700px] md:w-[550px] flex flex-col bg-white-color-alt shadow rounded-md p-8">
          <h3 className="font-semibold text-xl mb-4 text-center">
            Rating & Review
          </h3>

          <div>
            <p className="mb-4 font-medium">
              Rating will be display based on below emoticons:
            </p>
            <div className="flex gap-10 items-center justify-center">
              <span className="font-medium flex flex-col items-center justify-center">
                <img className="h-8" src="../../assets/emoji/bad.png" alt="" />
                Poor{" "}
              </span>
              <span className="font-medium flex flex-col items-center justify-center">
                <img className="h-8" src="../../assets/emoji/fair.png" alt="" />
                Fair{" "}
              </span>
              <span className="font-medium flex flex-col items-center justify-center">
                <img className="h-8" src="../../assets/emoji/good.png" alt="" />
                Good{" "}
              </span>
            </div>
          </div>

          <form>
            <div className="flex flex-col xl:mb-12 my-4">
              <label className="font-medium xl:mb-6 mb-4">Rate</label>
              <select
                className="p-2 border border-main-color-alt rounded-full cursor-pointer outline-none"
                name="rating"
                id="rating"
                onChange={handleChange}
              >
                <option value="">Please Select</option>
                <option value="bad">Poor</option>
                <option value="fair">Fair</option>
                <option value="good">Good</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-medium xl:mb-6 mb-4">Review</label>
              <textarea
                className="border border-main-color-alt rounded-md p-2 resize-none outline-none"
                name="comment"
                id="comment"
                onChange={handleChange}
                cols="40"
                rows="8"
              ></textarea>
            </div>
          </form>

          <button className="btn xl:mt-12 mt-8" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RateCar;
