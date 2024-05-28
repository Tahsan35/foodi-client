import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css";

const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <footer>footer</footer>
    </div>
  );
};

export default Main;