const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const tasksRoutes = require("./routes/tasks.routes.js"); // Import the tasks routes

const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(morgan("dev")); // Log HTTP requests to the console
app.use(express.json()); // Parse JSON request bodies

app.use(tasksRoutes); // Use the tasks routes

app.use((err, req, res, next) => {
  return res.json({
    message: err.message,
  });
});

app.listen(3000);
console.log("server started on port 3000");
