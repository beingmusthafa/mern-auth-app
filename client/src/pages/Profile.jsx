import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../firebase/firebase.js";
import { updateProfileImage } from "../redux/user/userSlice.js";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  let [image, setImage] = useState(null);
  const imageUploadRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
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
            updateProfileImage(url);
          }
          console.log(result.message);
        })
        .catch((error) => console.log(error));
    });
  }
  return (
    <div className="flex flex-col items-center max-w-sm mx-auto mb-10 ">
      <input
        ref={imageUploadRef}
        onChange={(e) => setImage(e.target.value)}
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
          className={`uppercase bg-slate-500 rounded-xl p-2 font-semibold text-white ${
            currentUser.externalAuth ? "cursor-not-allowed" : ""
          }`}
        >
          update
        </button>
      </form>
      <div className="flex justify-between w-full">
        <div className="text-red-500 font-semibold cursor-pointer">
          Delete account
        </div>
        <div className="text-red-500 font-semibold cursor-pointer">
          Sign out
        </div>
      </div>
    </div>
  );
};

export default Profile;
