import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//component imports
import Home from "./pages/Home.jsx";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import ChangePassword from "./pages/ChangePassword";
import ViewUsers from "./pages/ViewUsers";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AdminRoute from "./components/AdminRoute";
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route exact path="/admin" element={<ViewUsers />} />
          <Route path="/admin/add-user" element={<AddUser />} />
          <Route path="/admin/edit-user/:userId" element={<EditUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
