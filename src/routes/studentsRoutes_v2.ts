import { Router,type Request,type Response } from "express";
import {
  zStudentId,
} from "../schemas/studentValidator.js"

import type { Student } from "../libs/types.js";
import { courses, students } from "../db/db.js";
import { success } from "zod";
import { error } from "console";


const student_router = Router();




student_router.get("/student",(req:Request,res:Response) => {
    return res.json({
        data : students
    })
});



//1.



//2.
student_router.get("/api/v2/students/:studentId/courses", (req:Request,res:Response) => {
    const studentId = req.params.studentId;

  const student = students.find((s) => s.studentId === studentId);
  const result = zStudentId.safeParse(studentId);


if (!result.success) {
    return res.status(400).json({
      message : "Validation failed",
      errors : result.error.issues[0]?.message,
    });
  }
  
  
  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Student does not exists`
    });
  }

  res.set("Link", `/students/${studentId}`);

const studentCourseIds = student.courses || [];
  const studentCourses = courses
    .filter((course) => studentCourseIds.includes(course.courseId))
    .map((course) => ({
      courseId: course.courseId,
      courseTitle: course.courseTitle
    }));


    return res.json({
      success: true,
      message: `Get courses detail of student ${studentId}`,
      data: {
        studentId:student.studentId,
        courses:studentCourses
      }
    });

    
});




export default student_router;
