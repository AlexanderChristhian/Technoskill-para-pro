const pg = require("../utils/connect");
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { storeToken, deleteToken } = require('../utils/redis');

// Generate JWT token
const generateToken = (user) => {
  const userId = uuidv4(); // Generate a unique ID for the user session
  
  // Set expiry to 30 seconds - this is the critical change
  // Using '30s' explicitly tells JWT to use 30 seconds
  return jwt.sign(
    { 
      userId, 
      email: user.email, 
      username: user.username 
    }, 
    process.env.JWT_SECRET, 
    { expiresIn: '1h' } // Use the correct time format: '30s' for 30 seconds
  );
};

exports.register = async function register(req, res) {
  try {
    const { email, username, password } = req.body;

    const checkEmailResponse = await pg.query(
      "SELECT * FROM manager WHERE email = $1",
      [email]
    );

    if (checkEmailResponse.rows.length > 0) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    const response = await pg.query(
      "INSERT INTO manager (email, username, password) VALUES ($1, $2, $3) RETURNING *",
      [email, username, password]
    );

    res.status(201).json(response.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async function login(req, res) {
  try {
    const { email, password } = req.body;
    const response = await pg.query(
      "SELECT * FROM manager WHERE email = $1 AND password = $2",
      [email, password]
    );
    
    if (response.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = response.rows[0];
    
    // Generate token
    const token = generateToken(user);
    
    // Extract userId from the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    
    // Display token expiration information for debugging
    console.log('JWT expiration time:', decoded.exp);
    console.log('Current time:', Math.floor(Date.now() / 1000));
    const tokenExpiresIn = decoded.exp - Math.floor(Date.now() / 1000);
    console.log('Token will expire in:', tokenExpiresIn, 'seconds');
    
    // Store token in Redis with same expiry (matched to JWT token)
    await storeToken(userId, token, tokenExpiresIn);
    
    res.status(200).json({
      message: "Login successful",
      user: {
        email: user.email,
        username: user.username,
      },
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logout = async function logout(req, res) {
  try {
    // Get user ID from the token in the request
    const userId = req.user.userId;
    
    console.log(`Attempting to delete token for userId: ${userId}`);
    
    // Delete token from Redis
    await deleteToken(userId);
    
    console.log(`Token deletion completed for userId: ${userId}`);
    
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getProfile = async function getProfile(req, res) {
  try {
    // Get email from the token user data
    const { email } = req.user;
    
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const response = await pg.query(
      "SELECT email, username, password FROM manager WHERE email = $1",
      [email]
    );
    
    if (response.rows.length === 0) throw new Error("User not found");

    res.status(200).json(response.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePassword = async function updatePassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;
    const { email } = req.user;

    const checkPasswordResponse = await pg.query(
      "SELECT * FROM manager WHERE email = $1 AND password = $2",
      [email, currentPassword]
    );

    if (checkPasswordResponse.rows.length === 0) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    await pg.query(
      "UPDATE manager SET password = $1 WHERE email = $2",
      [newPassword, email]
    );

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

