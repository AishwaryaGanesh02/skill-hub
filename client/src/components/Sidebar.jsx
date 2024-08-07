import React from "react";
const Sidebar = () => {
  return (
    <aside className="h-screen w-1/6 bg-blue-600">
      <div className="text-start d-flex flex-column flex-shrink-0 p-3 h-100">
        <ul className="nav nav-pills flex-column mb-auto text-black">
          <li className="nav-item">
            <a href="#" className="nav-link bg-dark active text-white">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-black">
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-black">
              Requests
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-black">
              Beneficiary
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-black">
              Customers
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
