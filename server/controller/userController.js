const { PrismaClient } = require("@prisma/client");
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

const addUser = async (info) => {
  try {
    if (info.repassword !== info.password) {
      throw new Error("Password Mismatch");

    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: info.email },
    });
    if (existingUser) {
      throw new Error("User already exists");

    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const bcryptPassword = await bcrypt.hash(info.password, salt);

    await prisma.user.create({
      data: {
        name: info.name,
        email: info.email,
        role: info.role ? info.role : "employee",
        degnid: Number(info.degn),
        password: bcryptPassword,
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
