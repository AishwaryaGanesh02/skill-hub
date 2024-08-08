const router = require("express").Router();
const jwtGenerator = require("../JWTToken/jwtGenerator");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

// Login
/*
Route           /api/login
Description     Login
Access          Public
Parameter       NONE
Methods         POST
*/
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user in the database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json("Password or Email is incorrect");
    }
    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json("Password or Email is incorrect");
    }

    // Generate JWT token
    const token = jwtGenerator(user.id);
    const { id, role, degnid } = user;

    // Send response with token, role, degnid and user_id
    const response = {
      token,
      role,
      degnid,
      userid: id,
    };

    res.status(201).json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get designations
/*
Route           /api/designations
Description     Get all designations
Access          Public
Parameter       NONE
Methods         GET
*/
router.get("/designations", async (req, res) => {
  try {
    const response = await prisma.designation.findMany();
    // return allUser;
    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// Get one designations
/*
Route           /api/designation
Description     Login
Access          Public
Parameter       id
Methods         GET
*/
router.get("/designation/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await prisma.designation.findUnique({
      where: {
        id: Number(id),
      },
    });

    res.json(response);
    // console.log(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
