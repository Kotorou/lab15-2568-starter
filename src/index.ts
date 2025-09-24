import express, { type Request, type Response } from "express";
import morgan from "morgan";
import studentRouter from "./routes/studentsRoutes_v2.js";
import courseRouter from "./routes/courseRoutes.js";

// Initialize Express app
const app: express.Application = express();

// Middleware
app.use(express.json());
app.use(morgan("combined"));

// Root route
app.get("/", (req: Request, res: Response) => {
  res.send("API services for Student Data");
});

// Use different routes for students and courses
app.use("/courses", courseRouter);
app.use("/students", studentRouter);

// Listen on the appropriate port
app.listen(process.env.PORT || 3000, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT || 3000}`);
});

export default app;
