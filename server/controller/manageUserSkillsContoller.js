const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addUserSkill = async (info) => {
  try {
    await prisma.userSkill.create({
      data: {
        userid: Number(info.userid),
        skillid: Number(info.skillid),
        level: Number(info.level),
      },
    });
    return { success: true };
  } catch (error) {
    throw new Error("Error adding skill: " + error.message);
  }
};

const deleteUserSkill = async (id) => {
  try {
    const a = await prisma.userSkill.delete({
      where: {
        id: Number(id),
      },
    });
    return { success: true };
  } catch (error) {
    throw new Error("Error deleting userSkill: " + error.message);
  }
};

const readAllUserSkill = async () => {
  try {
    const alluserSkill = await prisma.userSkill.findMany();
    return alluserSkill;
  } catch (error) {
    throw new Error("Error fetching userSkills: " + error.message);
  }
};

const updateUserSkill = async (id, info) => {
  try {
    const userSkill = await prisma.userSkill.update({
      where: {
        id: Number(id),
      },
      data: {
        level: info.level,
      },
    });

    return { success: true };
  } catch (error) {
    throw new Error("Error updating userSkills: " + error.message);
  }
};

const readOneUserSkill = async (id) => {
  try {
    const userSkill = await prisma.userSkill.findMany({
      where: {
        userid: Number(id),
      },
    });
    return userSkill;
  } catch (error) {
    throw new Error("Error fetching userSkills: " + error.message);
  }
};

const calculateAverage = async (id) => {
  try {
    const result = await prisma.userSkill.aggregate({
      where: {
        skillid: Number(id),
      },
      _avg: {
        level: true,
      },
    });
    const avgerage = result._avg.level || 0;
    return avgerage;
  } catch (error) {
    throw new Error("Error fetching userSkills: " + error.message);
  } finally {
  }
};

const calculateAveragesByDesignation = async () => {
  try {
    const designations = await prisma.designation.findMany({
      select: {
        id: true,
        name: true,
        Users: {
          select: {
            degnid: true,
            UserSkills: {
              select: {
                skillid: true,
                level: true,
              },
            },
          },
        },
      },
    });

    const results = await Promise.all(
      designations.map(async (designation) => {
        const allSkillLevels = [];

        designation.Users.forEach((user) => {
          user.UserSkills.forEach((userSkill) => {
            allSkillLevels.push(userSkill.level);
          });
        });

        const totalLevel = allSkillLevels.reduce(
          (sum, level) => sum + level,
          0
        );
        const averageLevel =
          allSkillLevels.length > 0 ? totalLevel / allSkillLevels.length : 0;

        return {
          designation: designation.name,
          averageSkillLevel: averageLevel,
        };
      })
    );
    return results;
  } catch (error) {
    console.error("Error calculating average skill levels:", error.message);
    throw new Error("Error calculating average skill levels: " + error.message);
  }
};

const calculateCountLevel = async () => {
  try {
    const results = await prisma.userSkill.groupBy({
      by: ["level"],
      _count: {
        userid: true,
      },
    });
    const formattedResults = results.reduce((acc, item) => {
      acc[item.level] = item._count.userid;
      return acc;
    }, {});
    return formattedResults;
  } catch (error) {
    console.error(
      "Error calculating user count by skill level:",
      error.message
    );
    throw new Error(
      "Error calculating user count by skill level: " + error.message
    );
  }
};

module.exports = {
  addUserSkill,
  deleteUserSkill,
  readAllUserSkill,
  updateUserSkill,
  readOneUserSkill,
  calculateAverage,
  calculateAveragesByDesignation,
  calculateCountLevel,
};
