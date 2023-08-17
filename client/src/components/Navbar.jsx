import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BiBell, BiHistory, BiMenu, BiUser } from "react-icons/bi";
import { RiHome2Line } from "react-icons/ri";
import { BsChat } from "react-icons/bs";
import { FaCar } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { AuthContext } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";

const Navbar = () => {
  const [menu, setMenu] = useState(true);
  const showMenu = () => setMenu(!menu);
  const { user, dispatch } = useContext(AuthContext);
  const MenuList = [
    {
      name: "Home",
      path: "/home",
      icon: <RiHome2Line />,
    },
    {
      name: "Booking",
      path: "/upcoming",
      icon: <FaCar />,
    },
    {
      name: "History",
      path: "/history",
      icon: <BiHistory />,
    },
    // {
    //   name: "Chat",
    //   path: "/chat",
    //   icon: <BsChat />,
    // },
    {
      name: "Profile",
      path: "/profile",
      icon: <BiUser />,
    },
  ];

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    // alert("Successfully logout");
  };
  return (
    <>
      <div className=" md:h-16 h-12 lg:pr-8 p-4 flex justify-start items-center overflow-hidden">
        <Link to="#">
          <BiMenu
            className="text-main-color-alt text-xl cursor-pointer"
            onClick={showMenu}
          />
        </Link>
        <div className=" w-screen flex justify-between items-center sm:ml-10 ml-2 ">
          <h1 className="font-logo font-bold md:text-2xl text-xl">
            Go<span className="text-main-color-alt italic">Drive</span>
          </h1>
          <div className="flex gap-4 items-center">
            {user ? (
              <>
                {/* <div className="relative">
                  <BiBell className="text-main-color-alt md:text-2xl text-xl cursor-pointer" />
                  <span className="flex justify-center items-start w-4 h-4 bg-red-color rounded-full text-white-color-alt text-xs absolute -top-1 -right-1">
                    3
                  </span>
                </div> */}
                <div className="flex gap-4 items-center">
                  <img
                    className="md:w-9 w-8 md:h-9 h-8 object-cover rounded-full"
                    src={
                      user.profilePic
                        ? user.profilePic
                        : "./assets/img/noAvatar.png"
                    }
                    alt=""
                  />
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <span className="font-light">@{user.username}</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="md:text-xl font-medium cursor-pointer">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="md:text-xl font-medium border border-main-color-alt rounded-lg py-.5 px-4 cursor-pointer">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <nav
        className={`bg-main-color-alt ${
          menu ? "md:block md:w-16 hidden" : "md:w-60 w-screen"
        } h-full flex p-4 fixed top-0 transition-all ease-in-out duration-500 z-20`}
      >
        <ul onClick={showMenu} className="w-full ">
          <li className="">
            <Link to="#">
              <BiMenu className=" ml-1 mb-60 text-2xl text-white-color-alt" />
            </Link>
          </li>
          {MenuList.map((item, i) => {
            return (
              <li key={i} className="mb-8 relative ">
                <Link
                  to={item.path}
                  className={`${
                    menu.margin && "mt-5"
                  } text-white-color-alt  p-1.5 flex gap-4 items-center text-xl hover:bg-white-color-alt  hover:text-main-color-alt hover:rounded-bl-full hover:rounded-br-full hover:rounded-tl-full`}
                >
                  {item.icon}
                  <span
                    className={`whitespace-pre duration-500 ${
                      menu ? "hidden" : "flex"
                    } text-lg`}
                  >
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
          <div className="md:absolute md:bottom-0">
            <li className={`mb-6 [&.false]:hidden ${user.isOwner}`}>
              <Link
                to="/dashboard"
                className={`${
                  menu.margin && "mt-5"
                } text-white-color-alt  p-1.5 flex gap-4 items-center text-xl hover:bg-white-color-alt  hover:text-main-color-alt hover:rounded-bl-full hover:rounded-br-full hover:rounded-tl-full `}
              >
                <MdSpaceDashboard />
                <span
                  className={`whitespace-pre duration-500 ${
                    menu ? "hidden" : "flex"
                  } text-lg`}
                >
                  Dashboard
                </span>
              </Link>
            </li>
            <li className="mb-6 " onClick={handleLogout}>
              <Link
                to="/"
                className={`${
                  menu.margin && "mt-5"
                } text-white-color-alt  p-1.5 flex gap-4 items-center text-xl hover:bg-white-color-alt  hover:text-main-color-alt hover:rounded-bl-full hover:rounded-br-full hover:rounded-tl-full`}
              >
                <TbLogout />
                <span
                  className={`whitespace-pre duration-500 ${
                    menu ? "hidden" : "flex"
                  } text-lg`}
                >
                  Logout
                </span>
              </Link>
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
