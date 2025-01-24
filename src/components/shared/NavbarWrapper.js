import React from "react";
import Navbar from "./Navbar";

export default function NavbarWrapper({ children }) {
  return (
    <>
      <Navbar /> {children}
    </>
  );
}
