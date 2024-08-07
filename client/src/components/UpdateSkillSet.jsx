import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import AddUserSkillModel from "./AddUserSkillModel";
import Cookies from "js-cookie";

const UpdateSkillSet = () => {
  //   const [skillsData, setSkillsData] = useState([]);
  const [userSkillsData, setUserSkillsData] = useState([]);
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get("http://localhost:1200/api/skill");
  //         setSkillsData(response.data);
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       }
  //     };
  //     fetchData();
  //   }, []);
  const userid = Cookies.get("userid");
  const degnid = Cookies.get("degnid");

  useEffect(() => {
    const fetchSkillsAndUserSkills = async () => {
      try {
        const [skillsResponse, userSkillsResponse] = await Promise.all([
          axios.get(`http://localhost:1200/api/skill/${degnid}`),
          axios.get(`http://localhost:1200/api/userskill/${userid}`),
        ]);

        const skillsData = skillsResponse.data;
        setUserSkillsData(userSkillsResponse.data);

        const userSkillIds = userSkillsData.map((skill) => skill.skillid);

        const filteredSkills = skillsData.filter(
          (skill) => !userSkillIds.includes(skill.id)
        );
        // setReqdSkills(filteredSkills);
        // console.log(skillsData, userSkillsData, reqdSkills);
        // console.log(reqdSkills);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSkillsAndUserSkills();
  }, [userid, degnid]);
  console.log(userSkillsData);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [action, setAction] = useState("");
  const [selectedSkill, setSelectedSkill] = useState({ designations: [] });

  const handleManage = () => {
    setShowDeleteModal(true);
  };
  return (
    <div className="flex">
      <Sidebar />
      <div className="m-3">
        <div className="">
          <h1 className="font-bold text-center">
            Mange the skills and their corresponding designations
          </h1>
          {showDeleteModal && (
            <AddUserSkillModel action={action} skill={selectedSkill} />
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
                  Level
                </th>
              </tr>
            </thead>
            <tbody>
              {userSkillsData.length > 0
                ? userSkillsData.map((skill) => (
                    <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {skill.name}
                      </th>
                      <td class="px-6 py-4">{skill.desc}</td>
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

export default UpdateSkillSet;
