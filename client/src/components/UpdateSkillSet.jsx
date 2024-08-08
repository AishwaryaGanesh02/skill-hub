import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import AddUserSkillModel from "./AddUserSkillModel";
import Cookies from "js-cookie";

const UpdateSkillSet = () => {
  const [userSkillsData, setUserSkillsData] = useState([]);

  const userid = Cookies.get("userid");
  const degnid = Cookies.get("degnid");

  useEffect(() => {
    const fetchSkillsAndUserSkills = async () => {
      try {
        const [skillsResponse, userSkillsResponse] = await Promise.all([
          axios.get(`http://localhost:1200/api/skill/degn/${degnid}`),
          axios.get(`http://localhost:1200/api/userskill/${userid}`),
        ]);

        const userSkillsData = userSkillsResponse.data;

        const userSkillIds = userSkillsData.map((skill) => skill.skillid);

        const userSkillDetailsPromises = userSkillIds.map((skillId) =>
          axios.get(`http://localhost:1200/api/skill/${skillId}`)
        );

        const userSkillDetailsResponses = await Promise.all(
          userSkillDetailsPromises
        );

        const combinedSkillsData = userSkillDetailsResponses.map(
          (response) => ({
            ...response.data,
            level: userSkillsData.find(
              (skill) => skill.skillid === response.data.id
            ).level,
            userskillid: userSkillsData.find(
              (skill) => skill.skillid === response.data.id
            ).id,
          })
        );

        setUserSkillsData(combinedSkillsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSkillsAndUserSkills();
  }, [userid, degnid]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [action, setAction] = useState("");
  const [selectedSkill, setSelectedSkill] = useState({ designations: [] });

  const handleManage = () => {
    setShowDeleteModal(true);
  };

  const [editableSkillId, setEditableSkillId] = useState(null);
  const [updatedLevels, setUpdatedLevels] = useState({});

  const handleLevelChange = (skillId, level) => {
    setUpdatedLevels((prev) => ({
      ...prev,
      [skillId]: level,
    }));
  };

  const handleSave = async (userskillid) => {
    const newLevel = updatedLevels[userskillid];
    if (newLevel !== undefined) {
      try {
        await axios.put(
          `http://localhost:1200/api/userskill/edit/${userskillid}`,
          {
            level: newLevel,
          }
        );
        alert("Skill level updated");

        setUserSkillsData((prev) =>
          prev.map((skill) =>
            skill.userskillid === userskillid
              ? { ...skill, level: newLevel }
              : skill
          )
        );
        setEditableSkillId(null);
      } catch (error) {
        console.error("Error updating skill level:", error);
      }
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="m-3 w-full">
        <div>
          <h1 className="font-bold text-center">Manage your skill set</h1>
          {showDeleteModal && (
            <AddUserSkillModel action={action} skill={selectedSkill} />
          )}
        </div>
        <div>
          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={() => {
                setAction("Add");
                handleManage();
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded"
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
            </button>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Skills
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Level
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {userSkillsData.length > 0 ? (
                  userSkillsData.map((skill) => (
                    <tr
                      key={skill.userskillid}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {skill.name}
                      </td>
                      <td className="px-6 py-4">{skill.desc}</td>
                      <td className="px-6 py-4">
                        {editableSkillId === skill.userskillid ? (
                          <div className="flex gap-2">
                            {["Beginner", "Intermediate", "Advanced"].map(
                              (label, index) => (
                                <label
                                  key={index}
                                  className="inline-flex items-center"
                                >
                                  <input
                                    type="radio"
                                    name={`level-${skill.userskillid}`}
                                    value={index + 1}
                                    checked={
                                      updatedLevels[skill.userskillid] ===
                                      index + 1
                                    }
                                    onChange={() =>
                                      handleLevelChange(
                                        skill.userskillid,
                                        index + 1
                                      )
                                    }
                                    className="form-radio"
                                  />
                                  <span className="ml-2">{label}</span>
                                </label>
                              )
                            )}
                          </div>
                        ) : (
                          ["Beginner", "Intermediate", "Advanced"][
                            skill.level - 1
                          ]
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {editableSkillId === skill.userskillid ? (
                          <button
                            onClick={() => handleSave(skill.userskillid)}
                            className="px-4 py-2 bg-green-500 text-white rounded"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              setEditableSkillId(skill.userskillid)
                            }
                            className="px-4 py-2 bg-yellow-500 text-white rounded"
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center">
                      No data
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
export default UpdateSkillSet;
