import React from "react";
import { auth } from "../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const res = await fetch(
        import.meta.env.VITE_API_BASE_URL + "/api/auth/google-sign-in",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            name: result.user.displayName,
            email: result.user.email,
            imageUrl: result.user.photoURL,
          }),
        }
      );
      console.log("res", res);
      const data = await res.json();
      console.log("data", data);
      dispatch(signInSuccess(data.user));
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      className=" bg-red-400 rounded-xl p-2 font-semibold text-white max-w-fit mx-auto"
    >
      Sign in with Google
    </button>
  );
};

export default GoogleAuth;
