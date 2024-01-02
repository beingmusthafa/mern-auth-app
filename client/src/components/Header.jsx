import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  return location.pathname.startsWith("/sign-") ? (
    <></>
  ) : (
    <div className="bg-slate-500 flex justify-between p-4 text-white sticky top-0 w-full">
      <div className="font-bold">Auth</div>
      <ul className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {currentUser ? (
          <Link to="/profile">
            <img
              className="h-7 w-7 rounded-full object-cover"
              src={currentUser.profileImage}
              alt=""
            />
          </Link>
        ) : (
          <Link to="/sign-in">Sign in</Link>
        )}
      </ul>
    </div>
  );
};

export default Header;
