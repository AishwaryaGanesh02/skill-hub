const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const addUser = async (info) => {
  try {
    await prisma.user.create({
      data: {
        name: info.name,
        email: info.email,
        role: info.role ? info.role : "employee",
        degnid: info.degnid,
      },
    });
    return { success: true };
  } catch (error) {
    throw new Error("Error adding user: " + error.message);
  }
};

const deleteUser = async (id) => {
  try {
    const a = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    return { success: true };
  } catch (error) {
    throw new Error("Error deleting user: " + error.message);
  }
};

const readAllUsers = async () => {
  try {
    const allUser = await prisma.user.findMany();
    return allUser;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};

const readOneUser = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    return user;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};
// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
module.exports = { addUser, deleteUser, readAllUsers, readOneUser };
