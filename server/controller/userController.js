const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

const addUser = async (info) => {
  try {
    if (info.repassword !== info.password) {
      return "Password Mismatch";
    }
    const existingUser = await prisma.user.findUnique({
      where: { email: info.email },
    });
    if (existingUser) {
      return "User already exists";
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
    return "Successfully Registered";
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

const updateUser = async (id, info) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name: info.name,
        gender: info.gender,
      },
    });
    return { success: true };
  } catch (error) {
    throw new Error("Error updating skills: " + error.message);
  }
};

module.exports = { addUser, deleteUser, readAllUsers, readOneUser, updateUser };
