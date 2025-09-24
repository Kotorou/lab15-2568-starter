import express, {
  type Request,
  type Response,
} from "express";

import morgan from 'morgan';
import studentRouter from "./routes/studentsRoutes_v2.js";
import courseRouter from "./routes/courseRoutes.js";
const app: any = express();
const port = 3000;

//Middleware
app.use(express.json());
app.use(morgan("combined"));

app.listen(port , () =>
  console.log("🚀 Server running on http://localhost:3000")
);


app.get("/", (req: Request, res: Response) => {
  res.send("API services for Student Data");
});




app.use("/api/v2",courseRouter);
app.use("/api/v2",studentRouter);

export default app;
