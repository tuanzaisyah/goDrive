import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { BiImageAdd } from "react-icons/bi";
import storage from "../firebase.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const [info, setInfo] = useState({
    name: undefined,
    username: undefined,
    email: undefined,
    phone: undefined,
    password: undefined,
    profilePic: "",
  });
  const [file, setFile] = useState("");
  const [uploaded, setUploaded] = useState(0);

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

  // Upload image to firebase
  const upload = (item) => {
    item.forEach((item) => {
      // rename file name
      const fileName = new Date().getTime() + item.label + item.file.name;
      // create directory in firebase storage and upload image
      const uploadTask = storage.ref(`/profile/${fileName}`).put(item.file);
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
            setInfo((prev) => {
              return { ...prev, [item.label]: url };
            });
            // calculate file uploaded
            setUploaded((prev) => prev + 1);
            showToast("Picture successfully upload", "success");
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([{ file: file, label: "profilePic" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });

    try {
      const res = await axios.put("/users/" + user._id, info);
      showToast("Profile successfully updated!", "success");
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      setTimeout(() => {
        navigate("/profile");
      }, 3000);
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE", payload: err.response.data });
      showToast("Error in updating profile!", "error");
    }
  };
  return (
    <div className="overflow-hidden">
      <Navbar />

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

      <div className="w-screen lg:h-[calc(100vh-64px)] h-[calc(100vh-48px)]  md:ml-8 flex flex-col justify-center items-center px-4">
        <div className="xl:w-[1000px] md:w-[700px] w-full xl:h-[650px] bg-white-color p-8 rounded-3xl shadow">
          <button
            className="font-semibold text-lg float-right ml-4"
            onClick={handleSubmit}
          >
            Update Profile
          </button>
          {uploaded === 1 ? (
            <button
              className="font-semibold text-lg float-right hidden"
              onClick={handleUpload}
            >
              Upload
            </button>
          ) : (
            <button
              className="font-semibold text-lg float-right"
              onClick={handleUpload}
            >
              Upload
            </button>
          )}

          <div className="flex flex-col justify-center items-center mt-12 relative">
            <label
              htmlFor="file"
              className="border border-grey-color-alt rounded-md p-1 text-grey-color-alt text-xl absolute lg:right-[350px] md:right-44 right-8 bottom-16 cursor-pointer"
            >
              <BiImageAdd />
            </label>
            <img
              className="w-[130px] h-[130px] object-cover rounded-full border border-grey-color mb-14"
              src={
                file
                  ? URL.createObjectURL(file)
                  : user.profilePic
                  ? user.profilePic
                  : "./assets/img/noAvatar.png" + user.profilePic
              }
              alt=""
            />
            <input
              type="file"
              id="file"
              name="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="flex flex-col gap-4 md:px-20 md:mt-8">
            <div className="flex md:flex-row flex-col gap-4 xl:my-2">
              <div className="basis-1/2 ">
                <p className="font-medium">Name</p>
                <input
                  className="border-b-[1px] w-full"
                  type="text"
                  id="name"
                  placeholder={user.name}
                  onChange={handleChange}
                />
              </div>
              <div className="basis-1/2">
                <p className="font-medium">Username</p>
                <input
                  className="border-b-[1px] w-full"
                  type="text"
                  id="username"
                  placeholder={user.username}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex md:flex-row flex-col gap-4 xl:my-2">
              <div className="basis-1/2">
                <p className="font-medium">Email</p>
                <input
                  className="border-b-[1px] w-full"
                  type="text"
                  id="email"
                  placeholder={user.email}
                  onChange={handleChange}
                />
              </div>
              <div className="basis-1/2">
                <p className="font-medium">Telephone Number</p>
                <input
                  className="border-b-[1px] w-full"
                  type="text"
                  id="phone"
                  placeholder={user.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="xl:my-2">
              <p className="font-medium">Password</p>
              <input
                className="border-b-[1px] md:w-3/5 w-full"
                type="password"
                id="password"
                placeholder=""
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
