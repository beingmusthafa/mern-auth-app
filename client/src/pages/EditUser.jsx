import { useDispatch } from "react-redux";
import React, { useState, useRef, useEffect } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../firebase/firebase.js";
import { useParams, useNavigate } from "react-router-dom";
import loadingGif from "../assets/loading.gif";
import Popup from "../components/Popup.jsx";

const EditUser = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const imageUploadRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/admin/get-user-by-id/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          setError(data.message);
          return;
        }
        setUser(data.user);
        setIsLoading(false);
      });
  }, [userId]);
  useEffect(() => {
    if (user.externalAuth) {
      usernameRef.current.disabled = true;
      emailRef.current.disabled = true;
    }
  }, [user.externalAuth]);
  useEffect(() => {
    if (image) uploadImageToFirebase(image);
  }, [image]);
  function uploadImageToFirebase(image) {
    setIsProcessing(true);
    const storage = getStorage(app);
    const storageRef = ref(
      storage,
      `images/${Date.now().toString(36)}${image}`
    );
    uploadBytes(storageRef, image).then(async (snapshot) => {
      const url = await getDownloadURL(storageRef);
      fetch(import.meta.env.VITE_API_BASE_URL + "/api/admin/edit-user-image", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ imageUrl: url, userId }),
      })
        .then(async (res) => {
          const result = await res.json();
          if (!result.success) {
            setError(result.message);
            setIsProcessing(false);
            return;
          }
          console.log(result.newDetails);
          setUser(result.newDetails);
        })
        .catch((error) => console.log(error));
      setIsProcessing(false);
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
    const res = await fetch(
      import.meta.env.VITE_API_BASE_URL + "/api/admin/edit-user",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          newUsername,
          newEmail,
          userId,
        }),
      }
    );
    const data = await res.json();
    if (!data.success) {
      setError(data.message);
      setIsProcessing(false);
      return;
    }
    setError(data.message);
    setIsProcessing(false);
  }

  async function deleteUser() {
    setOpenPopup(false);
    setIsProcessing(true);
    const res = await fetch(`/api/admin/delete-user/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();
    if (!data.success) {
      setError(data.message);
      setIsProcessing(false);
      return;
    }
    setIsProcessing(false);
    navigate("/admin");
  }
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center">
        <img className="h-20 w-20 mx-auto" src={loadingGif} alt="" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center max-w-sm mx-auto mb-10 ">
      {openPopup && (
        <Popup
          text={"Do you want to delete this user?"}
          onCancel={() => setOpenPopup(false)}
          onConfirm={deleteUser}
        />
      )}
      <input
        ref={imageUploadRef}
        onChange={(e) => setImage(e.target.files[0])}
        type="file"
        hidden
        name="image"
        accept="image/*"
      />
      <img
        src={user.profileImage}
        alt=""
        className="w-24 h-24 mx-auto rounded-full cursor-pointer object-cover my-4"
        onClick={() => imageUploadRef.current.click()}
      />
      {isProcessing ? (
        <img className="h-10 w-10 mx-auto" src={loadingGif} alt="" />
      ) : (
        ""
      )}
      <p className="font-semibold text-red-500 my-2">{error}</p>
      <p className="font-medium text-red-400">
        {user.externalAuth
          ? "Credentials cannot be edited since they are from an external provider"
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
            user.externalAuth ? "cursor-not-allowed" : ""
          }`}
          defaultValue={user.username}
        />
        <label className="text-slate-700 font-semibold mb-1" htmlFor="">
          Email
        </label>
        <input
          ref={emailRef}
          type="text"
          name="email"
          className={`mb-4 rounded-lg bg-slate-200 p-2 ${
            user.externalAuth ? "cursor-not-allowed" : ""
          }`}
          defaultValue={user.email}
        />
        <button
          onClick={handleProfileUpdate}
          className={`uppercase bg-slate-500 rounded-xl p-2 font-semibold text-white ${
            user.externalAuth ? "cursor-not-allowed" : ""
          }`}
        >
          update
        </button>
      </form>
      <div className="flex justify-between w-full">
        <div
          onClick={() => setOpenPopup(true)}
          className="text-red-500 font-semibold cursor-pointer"
        >
          Delete account
        </div>
      </div>
    </div>
  );
};

export default EditUser;
