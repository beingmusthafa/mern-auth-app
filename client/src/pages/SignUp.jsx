import { useDispatch } from "react-redux";
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { updateCurrentUser } from "../redux/user/userSlice";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();
  const submitBtnRef = useRef();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);
    if (Object.keys(formData).length < 3) {
      setError("Please fill all the fields");
      setIsLoading(false);
      return;
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email");
      setIsLoading(false);
      return;
    }
    if (formData.password.trim().length < 8) {
      setError("Password must be at least 8 characters");
      setIsLoading(false);
      return;
    }
    submitBtnRef.current.disabled = true;
    const data = await fetch(
      import.meta.env.VITE_API_BASE_URL + "/api/auth/sign-up",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const res = await data.json();
    if (!res.success) {
      setError(res.message);
    } else {
      formRef.current.reset();
    }
    setSuccess(res.message);
    setIsLoading(false);
    submitBtnRef.current.disabled = false;
    console.log(res);
  };
  return (
    <div className="flex flex-col max-w-md mx-auto  px-3 ">
      <h2 className="uppercase text-3xl text-center font-semibold my-8">
        Sign Up
      </h2>
      <p
        className={`font-semibold my-2 ${
          error ? "text-red-500" : "text-green-500"
        }`}
      >
        {error ?? success}
      </p>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
        action=""
      >
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
          placeholder="Username"
          className="rounded-lg bg-slate-200 p-2"
        />

        <input
          type="email"
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
          {isLoading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <p className="text-center text-gray-500 my-4">
        Already have an account?
        <Link to="/sign-in" className="text-blue-400 font-semibold ml-2">
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
