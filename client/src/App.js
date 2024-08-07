import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManageSkills from "./components/ManageSkills";
import UserProfile from "./components/UserProfile";
import Dashboard from "./components/Dashboard";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import UpdateSkillSet from "./components/UpdateSkillSet";

function App() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/manageSkills" element={<ManageSkills />} />
          <Route path="/updateSkills" element={<UpdateSkillSet />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
