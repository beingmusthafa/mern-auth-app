import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../firebase/firebase.js";
import { updateCurrentUser, signOut } from "../redux/user/userSlice.js";
import { Link, useNavigate } from "react-router-dom";
import loadingGif from "../assets/loading.gif";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  let [image, setImage] = useState(null);
  let [error, setError] = useState(null);
  let [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const imageUploadRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentUser.externalAuth) {
      usernameRef.current.disabled = true;
      emailRef.current.disabled = true;
    }
  }, [currentUser.externalAuth]);
  useEffect(() => {
    if (image) uploadImageToFirebase(image);
  }, [image]);
  function uploadImageToFirebase(image) {
    console.log("image", image);
    const storage = getStorage(app);
    const storageRef = ref(
      storage,
      `images/${Date.now().toString(36)}${image}`
    );
    uploadBytes(storageRef, image).then(async (snapshot) => {
      const url = await getDownloadURL(storageRef);
      fetch("/api/user/update-profile-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl: url }),
      })
        .then(async (res) => {
          const result = await res.json();
          if (result.success) {
            dispatch(updateCurrentUser(result.newDetails));
          }
          console.log(result.message);
        })
        .catch((error) => console.log(error));
    });
  }

  async function handleProfileUpdate(e) {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);
    const newUsername = usernameRef.current.value.trim();
    const newEmail = emailRef.current.value.trim();
    if (newUsername.length < 3) {
      setError("Username must be at least 3 characters long");
      setIsProcessing(false);
      return;
    }
    if (!newEmail.includes("@") || newEmail.length < 7) {
      setError("Please enter a valid email");
      setIsProcessing(false);
      return;
    }
    const res = await fetch("/api/user/update-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newUsername,
        newEmail,
      }),
    });
    const data = await res.json();
    if (!data.success) {
      setError(data.message);
      setIsProcessing(false);
      return;
    }
    setIsProcessing(false);
    updateCurrentUser(data.newDetails);
    setError(data.message);
  }
  async function handleSignOut() {
    const res = await fetch("/api/auth/sign-out");
    const data = await res.json();
    if (!data.success) {
      console.log(data.message);
      return;
    }
    dispatch(signOut());
    navigate("/sign-in");
  }
  return (
    <div className="flex flex-col items-center max-w-sm mx-auto mb-10 ">
      <input
        ref={imageUploadRef}
        onChange={(e) => setImage(e.target.files[0])}
        type="file"
        hidden
        name="image"
        accept="image/*"
      />
      <img
        src={currentUser.profileImage}
        alt=""
        className="w-24 h-24 mx-auto rounded-full cursor-pointer my-4"
        onClick={() => imageUploadRef.current.click()}
      />
      {isProcessing ? (
        <img className="h-10 w-10 mx-auto" src={loadingGif} alt="" />
      ) : (
        ""
      )}
      <p className="font-semibold text-red-500 my-2">{error}</p>
      <p className="font-medium text-red-400">
        {currentUser.externalAuth
          ? "Your credentials cannot be edited since you logged in using an external provider"
          : ""}
      </p>
      <form action="" className="flex flex-col my-4 w-full">
        <label className="text-slate-700 font-semibold mb-1" htmlFor="">
          Username
        </label>
        <input
          ref={usernameRef}
          type="text"
          name="username"
          className={`mb-4 rounded-lg bg-slate-200 p-2 ${
            currentUser.externalAuth ? "cursor-not-allowed" : ""
          }`}
          defaultValue={currentUser.username}
        />
        <label className="text-slate-700 font-semibold mb-1" htmlFor="">
          Email
        </label>
        <input
          ref={emailRef}
          type="text"
          name="email"
          className={`mb-4 rounded-lg bg-slate-200 p-2 ${
            currentUser.externalAuth ? "cursor-not-allowed" : ""
          }`}
          defaultValue={currentUser.email}
        />
        <button
          onClick={handleProfileUpdate}
          className={`uppercase bg-slate-500 rounded-xl p-2 font-semibold text-white ${
            currentUser.externalAuth ? "cursor-not-allowed" : ""
          }`}
        >
          update
        </button>
      </form>
      <Link
        to="/change-password"
        className="text-blue-500 font-semibold cursor-pointer"
      >
        Change password
      </Link>
      <div className="flex justify-between w-full">
        <div className="text-red-500 font-semibold cursor-pointer">
          Delete account
        </div>
        <div
          onClick={handleSignOut}
          className="text-red-500 font-semibold cursor-pointer"
        >
          Sign out
        </div>
      </div>
    </div>
  );
};

export default Profile;
