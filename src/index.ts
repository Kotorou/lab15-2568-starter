import express, { type Request, type Response } from "express";
import morgan from "morgan";
import student_router from "./routes/studentsRoutes_v2.js";
import course_router from "./routes/courseRoutes.js";

// Initialize Express app
const app: any = express();
const port = 3000;
// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Root route
app.get("/", (req: Request, res: Response) => {
  res.send("API services for Student Data");
});

app.get("/me",(req:Request,res:Response) => {
    return res.status(200).json({
        success :true,
        message : "Student Information",
        data :{
            studentId:"670610679",
            firstName:"Kotaro",
            lastName:"Kawakami",
            program:"CPE",
            section:"001"
        }
    })
});

// Use different routes for students and courses
app.use("/api/v2/courses", course_router);
app.use("/api/v2/students", student_router);


// Listen on the appropriate port


export default app;
