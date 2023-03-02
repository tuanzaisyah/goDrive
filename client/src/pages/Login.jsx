import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  // get username and password from input form
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/home");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="overflow-hidden flex">
      <div className="container h-screen mx-auto flex flex-col justify-center items-center">
        <h1 className="font-logo font-bold lg:text-5xl text-3xl lg:mb-24 mb-16">
          Go<span className="text-main-color-alt italic">Drive</span>
        </h1>

        <h3 className="lg:text-3xl text-2xl font-medium pb-20">
          Welcome Back!
        </h3>

        <form className="flex flex-col gap-6 mb-12">
          <input
            className="xxxl:w-[550px] xl:w-[500px] lg:w-96 w-80 xl:h-14 h-12 border-[1px] border-main-color-alt rounded-lg py-2 px-4"
            type="text"
            id="username"
            placeholder="Username"
            required
            onChange={handleChange}
          />
          <input
            className="xxxl:w-[550px] xl:w-[500px] lg:w-96 w-80 xl:h-14 h-12 border-[1px] border-main-color-alt rounded-lg py-2 px-4"
            type="password"
            id="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />
        </form>

        {error && (
          <span className="text-red-color text-sm mb-4">{error.message}</span>
        )}
        <button
          className="xl:w-96 lg:w-64 w-80 h-12 bg-main-color-alt text-white-color text-xl mb-2"
          disabled={loading}
          onClick={handleLogin}
        >
          Login
        </button>
        <p className="text-sm">
          Don't have an account? Create one{" "}
          <Link to="/register" className="text-black-color">
            <span className="underline cursor-pointer text-black-color">
              here
            </span>
          </Link>
        </p>
      </div>
      <div className="container h-screen mx-auto md:flex xxl:w-full w-2/3 justify-center items-center bg-main-color hidden">
        <img
          className="xxl:w-[600px] lg:w-[400px] w-[300px] xxl:h-[600px] lg:h-[400px] h-[300px] object-cover"
          src="../../assets/img/login.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Login;
