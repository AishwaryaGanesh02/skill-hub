const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const port = 1200;

app.use(express.json());
app.use(cors());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use("/api/user", require("./routes/user"));
app.use("/api/skill", require("./routes/skills"));
app.use("/api/userskill", require("./routes/manageUserSkills"));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
