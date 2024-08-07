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

// I have an api to get a  list of roles and their corresponding skills
// I have an api to get a list users and their skills
// Do I require another api to to get the skills that the user is missing or can i compute that at the front end?
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
        name: info.name,
        desc: info.desc,
        degnid: info.degnid,
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

module.exports = {
  addUserSkill,
  deleteUserSkill,
  readAllUserSkill,
  updateUserSkill,
  readOneUserSkill,
};
