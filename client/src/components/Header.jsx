import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  return location.pathname.startsWith("/sign-") ? (
    <></>
  ) : (
    <div className="bg-slate-800 flex justify-between p-4 text-white sticky top-0 w-full font-semibold">
      <Link to="/" className="font-bold text-xl">
        AUTH
      </Link>
      <ul className="flex gap-4">
        {currentUser?.isAdmin && <Link to="/admin">Admin-dashboard</Link>}
        {currentUser ? (
          <Link to="/profile">
            <img
              className="h-7 w-7 rounded-full object-cover"
              src={currentUser?.profileImage}
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
