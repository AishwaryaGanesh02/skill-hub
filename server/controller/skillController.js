const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const addSkill = async (info) => {
  try {
    const skill = await prisma.skill.create({
      data: {
        name: info.name,
        desc: info.desc,
      },
    });

    const designationSkillPromises = info.degn.map((degnId) =>
      prisma.designationSkill.create({
        data: {
          degnid: Number(degnId),
          skillId: skill.id,
        },
      })
    );
    await Promise.all(designationSkillPromises);
    return { success: true };
  } catch (error) {
    throw new Error("Error adding skill: " + error.message);
  }
};

const deleteSkill = async (id) => {
  try {
    await prisma.userSkill.deleteMany({
      where: {
        skillid: Number(id),
      },
    });
    await prisma.designationSkill.deleteMany({
      where: {
        skillid: Number(id),
      },
    });
    await prisma.skill.delete({
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
    const allSkills = await prisma.skill.findMany({
      include: {
        DesignationSkill: {
          include: {
            degn: true,
          },
        },
      },
    });

    const skillsWithDesignations = allSkills.map((skill) => ({
      id: skill.id,
      name: skill.name,
      desc: skill.desc,
      designations: skill.DesignationSkill.map((ds) => ds.degn), // Extract related Designations
    }));

    return skillsWithDesignations;
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
      },
    });

    await prisma.designationSkill.deleteMany({
      where: {
        skillId: Number(id),
      },
    });

    const designationSkillPromises = info.degn.map((degnId) =>
      prisma.designationSkill.create({
        data: {
          degnid: Number(degnId),
          skillId: skill.id,
        },
      })
    );
    await Promise.all(designationSkillPromises);

    return { success: true };
  } catch (error) {
    throw new Error("Error updating skills: " + error.message);
  }
};

const readDesgSkills = async (id) => {
  try {
    const skills = await prisma.skill.findMany({
      where: {
        DesignationSkill: {
          some: {
            degnid: Number(id),
          },
        },
      },
    });

    return skills;
  } catch (error) {
    throw new Error("Error fetching skills: " + error.message);
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = {
  addSkill,
  deleteSkill,
  readAllSkills,
  updateSkill,
  readDesgSkills,
};
