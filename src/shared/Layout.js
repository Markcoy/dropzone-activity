import React from "react";
import Header from "../components/Header";
import bg1 from "../assets/bg1.jpg";

const Layout = ({ children }) => {
  return (
    <div
      className="flex-1"
      style={{ backgroundImage: `url(${bg1})`, backgroundSize: "cover" }}
    >
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
