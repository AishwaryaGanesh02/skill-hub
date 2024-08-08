import React from "react";
import Cookies from "js-cookie";
const Sidebar = () => {
  const userRole = Cookies.get("role");
  const path = userRole === "admin" ? "/manageSkills" : "/updateskills";
  return (
    <aside className="h-screen w-1/6 bg-blue-600">
      <div className="text-start d-flex flex-column flex-shrink-0 p-3 h-100">
        <ul className="nav nav-pills flex-column mb-auto text-black">
          <li className="nav-item">
            <a href="/Dashboard" className="nav-link bg-dark active text-white">
              Dashboard
            </a>
          </li>

          <li>
            <a href={path} className="nav-link text-black">
              {userRole == "admin" ? " Manage Skills" : "Update skill set"}
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-black">
              Profile
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
