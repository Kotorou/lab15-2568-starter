import { Router,type Request,type Response } from "express";
import {
  zStudentDeleteBody,
  zStudentPostBody,
  zStudentPutBody,
  zStudentId,
} from "../schemas/studentValidator.js"

import type { Student } from "../libs/types.js";
import { courses, students } from "../db/db.js";
import { success } from "zod";
import { error } from "console";


const router = Router();


router.get("/student",(req:Request,res:Response) => {
    return res.json({
        data : students
    })
});



//1.
router.get("/me",(req:Request,res:Response) => {
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


//2.
router.get("/students/:studentId/courses", (req:Request,res:Response) => {
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




export default router;
