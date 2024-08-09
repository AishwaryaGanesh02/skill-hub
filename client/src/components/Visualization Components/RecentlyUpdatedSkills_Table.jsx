import React from "react";

const RecentlyUpdatedSkills_Table = ({ skillsData }) => {
  if (!skillsData) return <p className="text-gray-500">No data</p>;

  return (
    <div>
      <h1 className="font-bold text-center text-2xl text-gray-900 mb-4">
        Recently Updated Skills
      </h1>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Skill Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Level
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Updated At
            </th>
          </tr>
        </thead>
        <tbody>
          {skillsData.map((skill) => (
            <tr key={skill.id} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {skill.skillDetails.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {["Beginner", "Intermediate", "Advanced"][skill.level - 1]}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {new Date(skill.updatedAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentlyUpdatedSkills_Table;
