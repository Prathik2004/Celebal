require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Basic validation helper (you can enhance this)
function validateUser(data) {
  const errors = [];

  if (!data.firstName || !data.lastName) errors.push("Name is required");
  if (!data.username) errors.push("Username is required");
  if (!data.email || !/\S+@\S+\.\S+/.test(data.email))
    errors.push("Valid email required");
  if (!data.password || data.password.length < 6)
    errors.push("Password must be at least 6 characters");
  if (!data.phoneNumber) errors.push("Phone number required");
  if (!data.country || !data.city) errors.push("Country and City required");
  if (!data.panNo) errors.push("PAN number required");
  if (!data.aadharNo) errors.push("Aadhar number required");

  return errors;
}

// Register route
app.post("/api/register", async (req, res) => {
  try {
    const errors = validateUser(req.body);
    if (errors.length > 0) return res.status(400).json({ errors });

    // Check for existing username or email
    const existingUser = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });

    if (existingUser)
      return res
        .status(400)
        .json({ errors: ["Username or email already exists"] });

    // Save user
    const user = new User(req.body);
    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ errors: ["Server error"] });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
