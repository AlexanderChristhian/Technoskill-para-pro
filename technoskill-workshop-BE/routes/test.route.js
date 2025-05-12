const express = require("express");
const { redisClient } = require("../utils/redis");
const jwt = require('jsonwebtoken');
const router = express.Router();

// Test route to check if Redis is working
router.get("/redis-test", async (req, res) => {
  try {
    // Check if Redis client is connected
    if (!redisClient.isReady) {
      return res.status(500).json({ 
        success: false, 
        message: "Redis client is not connected" 
      });
    }

    // Set a test key-value pair
    const testKey = "test_key";
    const testValue = "Redis is working! " + new Date().toISOString();
    
    await redisClient.set(testKey, testValue);
    
    // Get the value back
    const retrievedValue = await redisClient.get(testKey);
    
    // Return success response with the retrieved value
    res.status(200).json({
      success: true,
      message: "Redis is connected and working correctly",
      data: {
        key: testKey,
        setValue: testValue,
        retrievedValue: retrievedValue
      }
    });
  } catch (error) {
    console.error("Redis test error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to interact with Redis",
      error: error.message
    });
  }
});

// Test route to check token expiration
router.post("/check-token", async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ error: "Token is required" });
    }
    
    // Decode token without verifying to check expiration
    const decoded = jwt.decode(token);
    
    if (!decoded) {
      return res.status(400).json({ error: "Invalid token format" });
    }
    
    const now = Math.floor(Date.now() / 1000);
    const expiresIn = decoded.exp - now;
    
    // Check Redis for this token if userId exists
    let redisExpiry = null;
    if (decoded.userId) {
      const ttl = await redisClient.ttl(`auth_${decoded.userId}`);
      redisExpiry = ttl;
    }
    
    res.status(200).json({
      token_info: {
        userId: decoded.userId,
        email: decoded.email,
        issued_at: new Date(decoded.iat * 1000).toISOString(),
        expires_at: new Date(decoded.exp * 1000).toISOString(),
        expires_in_seconds: expiresIn,
        current_time: new Date(now * 1000).toISOString()
      },
      redis_info: {
        ttl_seconds: redisExpiry
      }
    });
  } catch (error) {
    console.error("Token check error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
