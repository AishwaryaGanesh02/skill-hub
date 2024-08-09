const router = require("express").Router();

const {
  addUserSkill,
  deleteUserSkill,
  readAllUserSkill,
  updateUserSkill,
  readOneUserSkill,
  calculateAverage,
  calculateCountLevel,
  calculateAveragesByDesignation,
} = require("../controller/manageUserSkillsContoller");

// Add new user_skill          #############
/*
Route           /api/userskill/add
Description     Add new user skill
Access          Public
Parameter       NONE
Methods         POST
*/
router.post("/add", async (req, res) => {
  try {
    const info = req.body;
    await addUserSkill(info);
    res.status(201).json({ message: "User Skill added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete skill
/*
Route           /api/userskill/delete
Description     Delete skill
Access          Public
Parameter       id
Methods         DELETE
*/
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteSkill(id);
    res.json({ message: "Skill deleted successfully" });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get count of user by level
/*
Route           /api/userskill/count-level
Description     Get average
Access          Public
Parameter       NONE
Methods         GET
*/
router.get("/count-level", async (req, res) => {
  try {
    const userSkills = await calculateCountLevel();
    res.json(userSkills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all user skills  *******
/*
Route           /api/userskill/
Description     Get all user skills
Access          Public
Parameter       NONE
Methods         GET
*/
router.get("/", async (req, res) => {
  try {
    const allSkills = await readAllUserSkill();
    res.json(allSkills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get avgerage of skills by desg
/*
Route           /api/userskill/user-avg-degn
Description     Get average
Access          Public
Parameter       NONE
Methods         GET
*/
router.get("/user-avg-degn", async (req, res) => {
  try {
    const userSkills = await calculateAveragesByDesignation();
    res.json(userSkills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get skills of a user    ########
/*
Route           /api/userskill/
Description     Get all skills of a user
Access          Public
Parameter       userid
Methods         GET
*/
router.get("/:userid", async (req, res) => {
  try {
    const { userid } = req.params;
    const userSkills = await readOneUserSkill(userid);
    res.json(userSkills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get avgerage of skills
/*
Route           /api/userskill/average/
Description     Get average
Access          Public
Parameter       skillid
Methods         GET
*/
router.get("/average/:skillid", async (req, res) => {
  try {
    const { skillid } = req.params;
    const userSkills = await calculateAverage(skillid);
    res.json(userSkills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update skill                 #######
/*
Route           /api/userskill/edit
Description     Update skill
Access          Public
Parameter       id
Methods         PUT
*/
router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const info = req.body;
    await updateUserSkill(id, info);
    res.status(201).json({ message: "Skill updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
