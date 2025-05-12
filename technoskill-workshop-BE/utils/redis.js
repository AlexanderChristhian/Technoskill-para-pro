const { createClient } = require('redis');
const dotenv = require('dotenv');

dotenv.config();

// Create Redis client - modify configuration to fix SSL issues
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://default:wekgATohLmabxbY0Eti11BIkQ7x9vCO3@redis-18814.c252.ap-southeast-1-1.ec2.redns.redis-cloud.com:18814',
  socket: {
    tls: false // Disable TLS for now to troubleshoot the connection
  }
});

// Add error handling for initial connection
let isConnecting = false;

// Connect to Redis
(async () => {
  if (isConnecting) return;
  isConnecting = true;

  redisClient.on('error', (err) => {
    console.log('Redis Client Error:', err);
    // Implement reconnection strategy
    setTimeout(() => {
      console.log('Attempting to reconnect to Redis...');
      redisClient.connect().catch(err => {
        console.error('Redis reconnect failed:', err);
      });
    }, 5000); // Try to reconnect after 5 seconds
  });

  redisClient.on('connect', () => console.log('Redis Client Connected'));
  redisClient.on('ready', () => console.log('Redis Client Ready for use'));
  redisClient.on('reconnecting', () => console.log('Redis Client Reconnecting'));
  redisClient.on('end', () => console.log('Redis Client Connection Ended'));
  
  try {
    await redisClient.connect();
    console.log('Connected to Redis Cloud successfully');
    
    // Test the connection with a simple command
    await redisClient.set('test_connection', 'Connection successful');
    const testValue = await redisClient.get('test_connection');
    console.log('Redis test response:', testValue);
  } catch (err) {
    console.error('Failed to connect to Redis Cloud:', err);
    console.log('Checking Redis URL format...');
    
    const redisUrl = process.env.REDIS_URL || 'redis://default:wekgATohLmabxbY0Eti11BIkQ7x9vCO3@redis-18814.c252.ap-southeast-1-1.ec2.redns.redis-cloud.com:18814';
    console.log('Redis URL format appears to be:', redisUrl.replace(/:[^:]*@/, ':***@'));
    
    // Attempt connection without TLS if it was previously enabled
    console.log('Attempting alternative connection method...');
  }
})();

// Fallback function to handle errors and provide offline functionality
const safeRedisOperation = async (operation) => {
  try {
    if (!redisClient.isReady) {
      console.log('Redis not ready, operating in offline mode');
      return null;
    }
    return await operation();
  } catch (error) {
    console.error('Redis operation failed:', error);
    return null;
  }
};

// Get Redis connection status
const getRedisStatus = async () => {
  return {
    isConnected: redisClient.isReady,
    connectionDetails: {
      url: 'Redis Cloud connection (redacted for security)',
      readyState: redisClient.isReady ? 'connected' : 'disconnected'
    }
  };
};

// Store token in Redis with expiry
const storeToken = async (userId, token, expiryTime) => { // Expire Time = 30 seconds
  return safeRedisOperation(async () => {
    // Add logging to verify expiry is set correctly
    console.log(`Setting token for ${userId} with expiry of ${expiryTime} seconds`);
    
    // Check TTL of any existing token before setting
    const existingKey = `auth_${userId}`;
    const existingTTL = await redisClient.ttl(existingKey);
    console.log(`Previous TTL for ${existingKey}: ${existingTTL}`);
    
    // Set the new token with expiration
    await redisClient.setEx(existingKey, expiryTime, token);
    
    // Verify TTL was set correctly
    const newTTL = await redisClient.ttl(existingKey);
    console.log(`New TTL for ${existingKey}: ${newTTL}`);
    
    return true;
  });
};

// Get token from Redis
const getToken = async (userId) => {
  return safeRedisOperation(async () => {
    return await redisClient.get(`auth_${userId}`);
  });
};

// Delete token from Redis
const deleteToken = async (userId) => {
  try {
    console.log(`Deleting token with key: auth_${userId}`);
    
    if (!redisClient.isReady) {
      console.log('Redis client not ready, cannot delete token');
      return false;
    }
    
    // Check if token exists before attempting deletion
    const tokenExists = await redisClient.exists(`auth_${userId}`);
    console.log(`Token exists check: ${tokenExists}`);
    
    if (!tokenExists) {
      console.log(`Token for userId ${userId} not found in Redis`);
      return false;
    }
    
    const result = await redisClient.del(`auth_${userId}`);
    console.log(`Token deletion result: ${result}`);
    
    // Verify deletion
    const checkExists = await redisClient.exists(`auth_${userId}`);
    console.log(`Verification - token exists after deletion: ${checkExists}`);
    
    return result === 1;
  } catch (error) {
    console.error(`Error deleting token for userId ${userId}:`, error);
    return false;
  }
};

module.exports = {
  redisClient,
  storeToken,
  getToken,
  deleteToken,
  getRedisStatus
};
