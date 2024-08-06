const router = require("express").Router();

const {
  addSkill,
  deleteSkill,
  readAllSkills,
  updateSkill,
  readDesgSkills,
} = require("../controller/skillController");

// Add new skill
/*
Route           /api/skill/add
Description     Add new skill
Access          Public
Parameter       NONE
Methods         POST
*/
router.post("/add", async (req, res) => {
  try {
    const info = req.body;
    await addSkill(info);
    res.status(201).json({ message: "Skill added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete skill
/*
Route           /api/skill/delete
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

// Get all skills
/*
Route           /api/skill/
Description     Get all skills
Access          Public
Parameter       NONE
Methods         GET
*/
router.get("/", async (req, res) => {
  try {
    const allSkills = await readAllSkills();
    res.json(allSkills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get skills of a designation
/*
Route           /api/skill/
Description     Get all skills of a designation
Access          Public
Parameter       id
Methods         GET
*/
router.get("/:degnid", async (req, res) => {
  try {
    const { degnid } = req.params;
    const desgSkills = await readDesgSkills(degnid);
    res.json(desgSkills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update skill
/*
Route           /api/skill/edit
Description     Update skill
Access          Public
Parameter       id
Methods         PUT
*/
router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const info = req.body;
    await updateSkill(id, info);
    res.status(201).json({ message: "Skill updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
