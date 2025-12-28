import express from "express";
import bodyParser from "body-parser";
import fs from "fs-extra";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/user", express.static("user"));
app.use("/admin", express.static("admin"));

const USERS = "./admin/users.json";

// submit UID
app.post("/submit", async (req, res) => {
  let { uid } = req.body;
  if (!uid) return res.json({ status: "error" });

  let data = await fs.readJSON(USERS);
  data.pending.push(uid);
  await fs.writeJSON(USERS, data);
  res.json({ status: "submitted" });
});

// approve
app.post("/approve", async (req, res) => {
  let { uid } = req.body;
  let data = await fs.readJSON(USERS);

  data.pending = data.pending.filter(u => u !== uid);
  data.approved.push(uid);

  await fs.writeJSON(USERS, data);
  res.json({ status: "approved" });
});

// login verify
app.post("/login", async (req, res) => {
  let { uid } = req.body;
  let data = await fs.readJSON(USERS);

  if (data.approved.includes(uid)) res.json({ access: true });
  else res.json({ access: false });
});

app.listen(3000, () => console.log("RUNNING"));