import React, { useEffect, useRef, useState } from "react";
import UserCard from "../components/UserCard";
import loadingGif from "../assets/loading.gif";

const ViewUsers = () => {
  let [users, setUsers] = useState([]);
  let [search, setSearch] = useState("");
  let [isLoading, setIsloading] = useState(false);
  let searchRef = useRef();
  useEffect(() => {
    getUsers();
  }, [search]);
  async function getUsers() {
    setIsloading(true);
    const res = await fetch(`api/admin/get-users?search=${search}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();
    console.log(data.users);
    setUsers(data.users);
    setIsloading(false);
  }
  return (
    <div className="h-screen w-screen">
      <form className="flex gap-4 w-fit mx-auto my-5">
        {search?.length ? (
          <button
            onClick={() => {
              setSearch("");
              searchRef.current.value = "";
            }}
            type="button"
            className="rounded-3xl p-2 font-semibold bg-black text-white"
          >
            X
          </button>
        ) : (
          ""
        )}
        <input
          ref={searchRef}
          type="text"
          placeholder="Search"
          className="p-2 border-2 border-black rounded-md w-56"
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* <button
          onClick={handleSearch}
          type="submit"
          className="rounded-lg p-2 font-semibold bg-black text-white"
        >
          Search
        </button> */}
      </form>
      <div className="flex flex-wrap p-4">
        {isLoading ? (
          <img className="h-20 w-20 mx-auto" src={loadingGif} alt="" />
        ) : (
          users?.map((user) => <UserCard user={user} key={user._id} />)
        )}
      </div>
    </div>
  );
};

export default ViewUsers;
