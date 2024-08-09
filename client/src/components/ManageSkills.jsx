import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import ManageSkillModel from "./ManageSkillModel";

const ManageSkills = () => {
  const [skillsData, setSkillsData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:1200/api/skill");
        setSkillsData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [action, setAction] = useState("");
  const [selectedSkill, setSelectedSkill] = useState({ designations: [] });

  const handleManage = () => {
    setShowDeleteModal(true);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-3 xs:ml-40 sm:ml-40 md:ml-56 flex-1">
        <div className="flex-1 p-6 bg-gray-100">
          <h1 className="font-extrabold text-21xl text-center mb-4">
            Manage Skills and Their Corresponding Designations
          </h1>
          {showDeleteModal && (
            <ManageSkillModel action={action} skill={selectedSkill} />
          )}
          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={() => {
                setAction("Add");
                handleManage();
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-plus-square"
                viewBox="0 0 16 16"
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
              Add Skill
            </button>
          </div>
          <div className="relative overflow-x-auto shadow-md rounded-lg bg-white">
            <table className="w-full text-sm text-gray-600">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left">
                    Skill
                  </th>
                  <th scope="col" className="px-6 py-3 text-left">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left">
                    Designations
                  </th>
                  <th scope="col" className="px-6 py-3 text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {skillsData.length > 0 ? (
                  skillsData.map((skill) => (
                    <tr key={skill.id} className="border-b">
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {skill.name}
                      </td>
                      <td className="px-6 py-4">{skill.desc}</td>
                      <td className="px-6 py-4">
                        <ul className="list-disc pl-5">
                          {skill.designations.map((degn, index) => (
                            <li key={index} className="text-gray-600">
                              {degn.name}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            setSelectedSkill(skill);
                            setAction("Edit");
                            handleManage();
                          }}
                          className="px-4 py-2 bg-yellow-500 text-white rounded"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSkills;
