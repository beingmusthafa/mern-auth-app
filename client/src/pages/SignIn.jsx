import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  let [formData, setFormData] = useState({});
  let [error, setError] = useState(null);
  let [isLoading, setIsLoading] = useState(false);
  let submitBtnRef = useRef();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    setError(null);
    setIsLoading(true);
    submitBtnRef.current.disabled = true;
    e.preventDefault();
    const data = await fetch("/api/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const res = await data.json();
    if (!res.success) {
      setError(res.message);
    }
    setIsLoading(false);
    submitBtnRef.current.disabled = false;
    console.log(res);
  };
  return (
    <div className="flex flex-col max-w-md mx-auto px-3 ">
      <h2 className="uppercase text-3xl text-center font-semibold my-10">
        Sign In
      </h2>
      <p className="font-semibold my-2 text-red-500">{error}</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" action="">
        <input
          type="text"
          name="email"
          id="email"
          onChange={handleChange}
          placeholder="Email"
          className="rounded-lg bg-slate-200 p-2"
        />

        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          placeholder="Password"
          className="rounded-lg bg-slate-200 p-2"
        />
        <button
          ref={submitBtnRef}
          type="submit"
          className="uppercase bg-cyan-400 rounded-xl p-2 font-semibold text-white "
        >
          {isLoading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <p className="text-center text-gray-500 my-4">
        Dont have an account?
        <Link to="/sign-in" className="text-blue-400 font-semibold ml-2">
          Sign up
        </Link>
      </p>
      <button className=" bg-red-400 rounded-xl p-2 font-semibold text-white max-w-fit mx-auto">
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;
