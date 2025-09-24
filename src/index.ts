import express, { type Request, type Response } from "express";
import morgan from "morgan";
import student_router from "./routes/studentsRoutes_v2.js";
import course_router from "./routes/courseRoutes.js";

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
app.use("/api/v2/courses", course_router);
app.use("/api/v2/students", student_router);


// Listen on the appropriate port
app.listen(process.env.PORT || 3000, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT || 3000}`);
});

export default app;
