import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.config.js";
import sectionRouter from "./src/routes/section.route.js";

dotenv.config();
const app = express();

app.use(express.json());

app.use("/api/v1", sectionRouter);
app.get("/", ((req, res)=>{
  res.status(200).json({
    message: "Hello, It works"
  })
})
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || "An unexpected error occurred";
  res.status(statusCode).json({
    status_code: statusCode,
    success: false,
    error: {
      message,
    },
  });
});

connectDB(app);

