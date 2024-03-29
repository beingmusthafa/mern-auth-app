import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInSuccess, signInFailure } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import GoogleAuth from "../components/GoogleAuth";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const submitBtnRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
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
    setError(false);
    submitBtnRef.current.disabled = true;
    setLoading(true);
    try {
      const data = await fetch(
        import.meta.env.VITE_API_BASE_URL + "/api/auth/sign-in",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const res = await data.json();
      setLoading(false);
      if (!res.success) {
        dispatch(signInFailure(res.message));
        setError(res.message);
      } else {
        dispatch(signInSuccess(res.user));
        localStorage.setItem("token", res.token);
        navigate("/");
      }
      submitBtnRef.current.disabled = false;
      console.log(res);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
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
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <p className="text-center text-gray-500 my-4">
        Dont have an account?
        <Link to="/sign-up" className="text-blue-400 font-semibold ml-2">
          Sign up
        </Link>
      </p>
      <GoogleAuth />
    </div>
  );
};

export default SignIn;
