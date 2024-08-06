const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const addSkill = async (info) => {
  try {
    await prisma.skill.create({
      data: {
        name: info.name,
        desc: info.desc,
        degnid: info.degnid,
      },
    });
    return { success: true };
  } catch (error) {
    throw new Error("Error adding skill: " + error.message);
  }
};

const deleteSkill = async (id) => {
  try {
    const a = await prisma.skill.delete({
      where: {
        id: Number(id),
      },
    });
    return { success: true };
  } catch (error) {
    throw new Error("Error deleting skill: " + error.message);
  }
};

const readAllSkills = async () => {
  try {
    const allskill = await prisma.skill.findMany();
    return allskill;
  } catch (error) {
    throw new Error("Error fetching skills: " + error.message);
  }
};

const updateSkill = async (id, info) => {
  try {
    const skill = await prisma.skill.update({
      where: {
        id: Number(id),
      },
      data: {
        name: info.name,
        desc: info.desc,
        degnid: info.degnid,
      },
    });
    return { success: true };
  } catch (error) {
    throw new Error("Error updating skills: " + error.message);
  }
};

const readDesgSkills = async (id) => {
  try {
    const skill = await prisma.skill.findMany({
      where: {
        degnid: Number(id),
      },
    });
    return skill;
  } catch (error) {
    throw new Error("Error fetching skills: " + error.message);
  }
};
module.exports = {
  addSkill,
  deleteSkill,
  readAllSkills,
  updateSkill,
  readDesgSkills,
};
