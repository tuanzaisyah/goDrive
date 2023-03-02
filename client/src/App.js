import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddVehicle from "./pages/AddVehicle";
import Booking from "./pages/Booking";
import BookingDetails from "./pages/BookingDetails";
import BookingList from "./pages/BookingList";
import CarDetails from "./pages/CarDetails";
import CarList from "./pages/CarList";
import Chat from "./pages/Chat";
import Dashboard from "./pages/Dashboard";
import EditVehicle from "./pages/EditVehicle";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import Register from "./pages/Register";
import History from "./pages/History";
import RateCar from "./pages/RateCar";
import RateUser from "./pages/RateUser";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cars" element={<CarList />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/upcoming" element={<Booking />} />
          <Route path="/history" element={<History />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profileEdit" element={<ProfileEdit />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addVehicle" element={<AddVehicle />} />
          <Route path="/cars/edit/:id" element={<EditVehicle />} />
          <Route path="/cars/bookingList/:id" element={<BookingList />} />
          <Route path="/bookingDetails/:id" element={<BookingDetails />} />
          <Route path="/rateCar/:carId" element={<RateCar />} />
          <Route path="/rateUser/:userId" element={<RateUser />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
