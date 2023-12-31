import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-slate-500 flex justify-between p-4 text-white">
      <div className="font-bold">Auth</div>
      <ul className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/sign-in">Sign in</Link>
      </ul>
    </div>
  );
};

export default Header;
