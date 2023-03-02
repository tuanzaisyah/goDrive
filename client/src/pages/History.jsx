import React from "react";
import { useContext } from "react";
import Navbar from "../components/Navbar";
import PanelHistory from "../components/PanelHistory";
import { AuthContext } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";

const History = () => {
  const { user } = useContext(AuthContext);
  const { data, loading } = useFetch(`/users/booking/${user._id}`);
  return (
    <div>
      <Navbar />
      <div className="flex flex-col lg:items-center md:ml-16 my-8 px-4">
        {loading ? (
          "loading"
        ) : (
          <>
            {/* sort then map */}
            {data
              .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
              .map((item) => (
                <PanelHistory item={item} key={item._id} />
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default History;
