import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="flex flex-col max-w-md mx-auto">
      <h2 className="uppercase text-3xl text-center font-semibold my-10">
        Sign Up
      </h2>
      <form className="flex flex-col px-3 gap-4" action="">
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          className="rounded-lg bg-slate-200 p-2"
        />

        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="rounded-lg bg-slate-200 p-2"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="rounded-lg bg-slate-200 p-2"
        />
        <button
          type="submit"
          className="uppercase bg-cyan-400 rounded-xl p-2 font-semibold text-white "
        >
          Sign Up
        </button>
      </form>
      <p className="text-center text-gray-500 my-4">
        Already have an account?{" "}
        <Link to="/sign-in" className="text-blue-400 font-semibold">
          Sign in
        </Link>
      </p>
      <button className=" bg-red-400 rounded-xl p-2 font-semibold text-white max-w-fit mx-auto">
        Sign in with Google
      </button>
    </div>
  );
};

export default SignUp;
