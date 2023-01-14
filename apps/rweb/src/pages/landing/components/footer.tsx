import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="my-2 text-white w-full">
      <div className="contacts flex justify-end mt-1 mx-6 space-x-1">
        <Link to="/">@shgpu-table</Link>
        <Link to="https://github.com/danilluk1">danluki</Link>
      </div>
    </footer>
  );
};

export default Footer;
