import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="my-2 text-white w-full">
      <div className="contacts flex justify-end mt-1 mx-6 space-x-1">
        <Link href="/">@shgpu-table</Link>
        <Link href="https://github.com/danilluk1">danluki</Link>
      </div>
    </footer>
  );
};

export default Footer;
