import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  let [error, setError] = useState(null);
  const navigate = useNavigate();
  let oldPasswordRef = useRef();
  let newPasswordRef = useRef();
  async function handleSubmit(e) {
    e.preventDefault();
    let oldPassword = oldPasswordRef.current.value.trim();
    let newPassword = newPasswordRef.current.value.trim();
    console.log({ oldPassword, newPassword });
    if (!oldPassword.length || !newPassword.length) {
      setError("All fields are required");
      return;
    }
    if (oldPassword === newPassword) {
      setError("New password cannot be the same as old password");
      return;
    }
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters long");
      return;
    }
    const res = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    });
    const data = await res.json();
    if (!data.success) {
      setError(data.message);
      return;
    }
    setError(null);
    navigate("/profile");
  }
  return (
    <div className="flex flex-col items-center max-w-sm mx-auto mb-10 ">
      <p className="font-semibold text-red-500 mt-10 mb-2">{error}</p>
      <form action="" className="flex flex-col my-4 w-full">
        <label className="text-slate-700 font-semibold mb-1" htmlFor="">
          Confirm old password
        </label>
        <input
          ref={oldPasswordRef}
          type="text"
          name="oldPassword"
          className={`mb-4 rounded-lg bg-slate-200 p-2 `}
        />
        <label className="text-slate-700 font-semibold mb-1" htmlFor="">
          New password
        </label>
        <input
          ref={newPasswordRef}
          type="text"
          name="newPassword"
          className={`mb-4 rounded-lg bg-slate-200 p-2 `}
        />
        <button
          onClick={handleSubmit}
          className={`uppercase bg-slate-500 rounded-xl p-2 font-semibold text-white`}
        >
          update
        </button>
      </form>
      <div className="flex justify-between w-full">
        <div
          className="text-red-500 font-semibold cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Cancel
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
