import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageSkillModel = ({ action, skill }) => {
  const [skillName, setSkillName] = useState(skill.name);
  const [skillDescription, setSkillDescription] = useState(skill.desc);
  var designationIds = [];

  skill.designations.map((degn) => designationIds.push(degn.id));

  const [designations, setDesignations] = useState([]);
  const [selectedDesignations, setSelectedDesignations] =
    useState(designationIds);

  useEffect(() => {
    const fetchDesignations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1200/api/designations"
        );
        setDesignations(response.data);
      } catch (error) {
        console.error("Error fetching designations:", error);
      }
    };
    fetchDesignations();
  }, []);

  const handleSkillNameChange = (event) => {
    setSkillName(event.target.value);
  };

  const handleSkillDescriptionChange = (event) => {
    setSkillDescription(event.target.value);
  };

  const handleDesignationChange = (event) => {
    const { value, checked } = event.target;
    const designationId = parseInt(value, 10);

    setSelectedDesignations((prev) =>
      checked
        ? [...prev, designationId]
        : prev.filter((id) => id !== designationId)
    );
  };

  const handleSave = async () => {
    const body = {
      name: skillName,
      desc: skillDescription,
      degn: selectedDesignations,
    };
    if (action == "Add") {
      try {
        const response = await axios.post(
          `http://localhost:1200/api/skill/add`,
          body
        );
      } catch (error) {
        console.error("Error saving skill:", error.message);
      }
      alert("saved");
    } else {
      try {
        const response = await axios.put(
          `http://localhost:1200/api/skill/edit/${skill.id}`,
          body
        );
      } catch (error) {
        console.error("Error saving skill:", error.message);
      }
      alert("saved");
    }
    handleClose();
  };

  const handleClose = () => {
    window.location.reload();
  };

  return (
    <div
      className={`relative z-10 `}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <h1 className="text-center font-bold text-5xl">
                {action == "Add" ? "Add new skills" : "Edit skill"}
              </h1>
              <div className="mb-4">
                <label
                  htmlFor="skill-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Skill Name
                </label>
                <input
                  id="skill-name"
                  type="text"
                  className="p-2 mt-1 block w-full border-2 rounded-md shadow-sm h-10"
                  value={skillName}
                  onChange={handleSkillNameChange}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="skill-description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Skill Description
                </label>
                <textarea
                  id="skill-description"
                  className="p-2 mt-1 block w-full border-2 rounded-md shadow-sm"
                  rows="3"
                  value={skillDescription}
                  onChange={handleSkillDescriptionChange}
                />
              </div>

              <div className="mb-4">
                <span className="block text-sm font-medium text-gray-700">
                  Designations
                </span>
                <div className="mt-2 space-y-2">
                  {designations.map((designation) => (
                    <div key={designation.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`designation-${designation.id}`}
                        value={designation.id}
                        checked={selectedDesignations.includes(designation.id)}
                        onChange={handleDesignationChange}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`designation-${designation.id}`}
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        {designation.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 sm:align-items-center">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSkillModel;
