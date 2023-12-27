const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = process.env.PORT || 5000;
const User = require('./models/users');
require('./db/conn');
app.use(express.json());

// Register a new user
app.post('/user/register', async (req, res) => {
  try {
    const { name, email, password, phone, profession } = req.body;

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      profession,
      progress: 0
    });

    const createUser = await user.save();
    res.status(200).send(createUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login user and return a JWT token
app.post('/user/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the entered password with the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'your_secret_key');

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get user information (protected route)
app.get('/user/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const userData = await User.findById(_id);
    res.status(200).send(userData);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
