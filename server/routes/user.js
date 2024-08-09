const router = require("express").Router();

const {
  addUser,
  deleteUser,
  readAllUsers,
  readOneUser,
  updateUser,
} = require("../controller/userController");

// Add new user           ############
/*
Route           /api/user/add
Description     Add new user
Access          Public
Parameter       NONE
Methods         POST
*/
router.post("/add", async (req, res) => {
  try {
    const info = req.body;

    const result = await addUser(info);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete user
/*
Route           /api/user/delete
Description     Delete user
Access          Public
Parameter       id
Methods         DELETE
*/
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUser(id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get all users
/*
Route           /api/user/
Description     Get all user
Access          Public
Parameter       NONE
Methods         GET
*/
router.get("/", async (req, res) => {
  try {
    const allUsers = await readAllUsers();
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get one user
/*
Route           /api/user/
Description     Get all user
Access          Public
Parameter       id
Methods         GET
*/
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userInfo = await readOneUser(id);
    res.json(userInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user        ############
/*
Route           /api/user/edit
Description     Update user
Access          Public
Parameter       id
Methods         PUT
*/
router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const info = req.body;
    await updateUser(id, info);
    res.status(201).json({ message: "Skill updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
