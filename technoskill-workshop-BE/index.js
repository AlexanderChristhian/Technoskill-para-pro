const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const managerRoute = require("./routes/manager.route");
const employeeRoute = require("./routes/employee.route");
const testRoute = require("./routes/test.route");

const cors = require("cors");
dotenv.config();

// Initialize Redis with proper error handling
try {
  console.log('Initializing Redis connection...');
  require('./utils/redis');
  console.log('Redis module loaded');
} catch (error) {
  console.error('Error initializing Redis:', error);
  console.log('Application will continue without Redis functionality');
}

// Add graceful shutdown handling
process.on('SIGINT', async () => {
  console.log('Received SIGINT. Graceful shutdown initiated.');
  try {
    const { redisClient } = require('./utils/redis');
    if (redisClient && redisClient.isReady) {
      console.log('Closing Redis connection...');
      await redisClient.quit();
      console.log('Redis connection closed.');
    }
  } catch (err) {
    console.error('Error during shutdown:', err);
  }
  process.exit(0);
});

const port = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use("/manager", managerRoute);
app.use("/employee", employeeRoute);
app.use("/test", testRoute);

app.listen(port, () => {
  console.log(`Running on port ${port}!`);
});
