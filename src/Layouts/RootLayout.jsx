import { Outlet } from "react-router";
import Footer from "../Pages/SharedPages/Footer/Footer";
import NavBar from "../Pages/SharedPages/NavBar/NavBar";

const RootLayout = () => {
  return (
    <div className="">
      <div className="bg-base-100 shadow-sm">
        {" "}
        <NavBar />
      </div>

      <div className="container mx-auto px-4">
        {" "}
        <Outlet />
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;
