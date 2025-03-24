// server/models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

 UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);

// server/models/Task.js
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  status: { type: String, enum: ["In Progress", "Completed"], default: "In Progress" },
});

module.exports = mongoose.model("Task", TaskSchema);

// server/routes/auth.js
const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).send("User registered");
  } catch (error) {
    res.status(400).send("Error registering user");
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send("Invalid credentials");
    }
    res.status(200).send("Login successful");
  } catch (error) {
    res.status(400).send("Error logging in");
  }
});

module.exports = router;

// server/routes/tasks.js
const express = require("express");
const Task = require("../models/Task");
 router = express.Router();

router.post("/", async (req, res) => {
  const { userId, title, description, date } = req.body;
  try {
    const task = new Task({ userId, title, description, date });
    await task.save();
    res.status(201).send("Task added");
  } catch (error) {
    res.status(400).send("Error adding task");
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send("Error updating task");
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.status(200).send("Task deleted");
  } catch (error) {
    res.status(400).send("Error deleting task");
  }
});

module.exports = router;

// server/routes/auth.js
router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = new User({ username, password });
      await user.save();
      res.status(201).send("User registered");
    } catch (error) {
      res.status(400).send("Error registering user");
    }
  });

  // server/models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);

// server/routes/auth.js
router.post("/register", async (req, res) => {
    const { name, surname, email, password } = req.body;
    try {
      // Check if email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
  
      // Create new user
      const user = new User({ name, surname, email, password });
      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(400).json({ message: "Error registering user", error: error.message });
    }
  });

  // server/routes/auth.js
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

// server/routes/auth.js
router.post("/register", async (req, res) => {
  const { name, surname, email, password } = req.body;

  try {
    // Check if email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Create new user
    const user = new User({ name, surname, email, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully" }); // Success response
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
});

const express = require('express');
const connectDB = require('./db');

 app = express();

// Connect to MongoDB
connectDB();

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

const express = require('express');
const connectDB = require('./db');

const app = express();

app.get('/', async (req, res) => {
  const db = await connectDB();
  const users = await db.collection('users').find().toArray();
  res.json(users);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});