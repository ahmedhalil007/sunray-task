require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const emailRoutes = require("./routes/emailRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", emailRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
