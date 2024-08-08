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
    <div className="">
      <Sidebar />
      <div className="m-3 sm:ml-42 md:ml-60">
        <div className="">
          <h1 className="font-bold text-center">
            Mange the skills and their corresponding designations
          </h1>
          {showDeleteModal && (
            <ManageSkillModel action={action} skill={selectedSkill} />
          )}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                setAction("Add");
                handleManage();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-plus-square"
                viewBox="0 0 16 16"
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
            </button>
          </div>
        </div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Skills
                </th>
                <th scope="col" class="px-6 py-3">
                  Decription
                </th>
                <th scope="col" class="px-6 py-3">
                  Designation
                </th>
                <th scope="col" class="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {skillsData.length > 0
                ? skillsData.map((skill) => (
                    <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {skill.name}
                      </th>
                      <td class="px-6 py-4">{skill.desc}</td>
                      {skill.designations.map((degn) => (
                        <tr class="px-6 py-4">{degn.name}</tr>
                      ))}
                      <td class="px-6 py-4 ">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedSkill(skill);
                            handleManage();
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-pencil-square"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path
                              fill-rule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                : "No data"}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageSkills;
