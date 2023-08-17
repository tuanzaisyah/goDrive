import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    name: undefined,
    username: undefined,
    email: undefined,
    password: undefined,
    isOwner: undefined,
  });

  const showToast = (message, type) => {
    const toastType = type === "success" ? toast.success : toast.error;

    toastType(message, {
      position: "top-center",
      autoClose: type === "error" ? 2000 : 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/register", info);
      showToast("Registration success! You can login now", "success");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      showToast("Error in register new user!", "error");
    }
  };

  return (
    <div className="overflow-hidden flex">
      {/* display toast */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div className="container h-screen mx-auto md:flex xl:w-1/3 w-2/3 flex-col justify-center items-center bg-main-color hidden">
        <h1 className=" xxl:text-4xl lg:text-3xl text-2xl text-center text-white-color-alt font-medium lg:mb-12 mb-10">
          New User Registration
        </h1>
        <img
          className=" xxl:w-[450px] lg:w-[350px] w-[300px] xxl:h-[450px] lg:h-[350px] h-[300px] object-cover"
          src="../../assets/img/register.png"
          alt=""
        />
      </div>
      <div className=" container h-screen mx-auto flex flex-col justify-center items-center">
        <h1 className="font-logo  lg:text-5xl text-3xl font-bold lg:mb-18 mb-12">
          Go<span className="text-main-color-alt italic">Drive</span>
        </h1>

        <form className="flex flex-col xxl:gap-10 gap-6 ">
          <input
            className="xxxl:w-[550px] xl:w-[500px] lg:w-96 w-80 xl:h-14 h-12 border-[1px] border-main-color-alt rounded-lg p-3"
            type="text"
            id="name"
            placeholder="Name"
            required
            onChange={handleChange}
          />
          <input
            className="xxxl:w-[550px] xl:w-[500px] lg:w-96 w-80 xl:h-14 h-12 border-[1px] border-main-color-alt rounded-lg p-3"
            type="text"
            id="username"
            placeholder="Username"
            required
            onChange={handleChange}
          />
          <input
            className="xxxl:w-[550px] xl:w-[500px] lg:w-96 w-80 xl:h-14 h-12 border-[1px] border-main-color-alt rounded-lg p-3"
            type="email"
            id="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />
          <input
            className="xxxl:w-[550px] xl:w-[500px] lg:w-96 w-80 xl:h-14 h-12 border-[1px] border-main-color-alt rounded-lg p-3"
            type="password"
            id="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />
          <div className="pt-4 md:pb-14 pb-10">
            <label htmlFor="">Sign Up as: </label>
            <select
              id="isOwner"
              onChange={handleChange}
              className="border border-main-color-alt rounded-full py-1 px-8 ml-2"
            >
              <option value="">Please Select</option>
              <option value="false">User</option>
              <option value="true">Owner</option>
            </select>
          </div>
        </form>

        <button
          className="xl:w-96 lg:w-64 w-80 h-12 bg-main-color-alt text-white-color-alt text-xl mb-6"
          onClick={handleRegister}
        >
          Register
        </button>
        <Link to="/">
          <button className="xl:w-96 lg:w-64 w-80 h-12 border-[1px] border-main-color-alt text-xl">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Register;
