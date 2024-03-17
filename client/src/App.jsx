import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//component imports
import Home from "./pages/Home.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Profile from "./pages/Profile.jsx";
import About from "./pages/About.jsx";
import Header from "./components/Header.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import ChangePassword from "./pages/changePassword.jsx";
import ViewUsers from "./pages/ViewUsers.jsx";
import AddUser from "./pages/AddUser.jsx";
import EditUser from "./pages/EditUser.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
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
