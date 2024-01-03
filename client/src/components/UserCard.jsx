import React from "react";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/admin/edit-user/${user._id}`)}
      className="w-40 h-40 flex flex-col items-center"
    >
      <img
        src={user.profileImage}
        alt=""
        className="rounded-full w-20 h-20 object-cover"
      />
      <p className="text-center font-semibold w-5/6 text-ellipsis overflow-hidden">
        {user.username}
      </p>
      <p className="text-center w-5/6 text-ellipsis overflow-hidden">
        {user.email}
      </p>
    </div>
  );
};

export default UserCard;
