import { Router,type Request,type Response } from "express";
import { courses } from "../db/db.js";
import { success } from "zod";
import type { Course } from "../libs/types.js";
import { error } from "console";
import {
  zCourseId,
  zCoursePostBody,
  zCoursePutBody,
  zCourseDeleteBody
  
} from "../schemas/courseValidator.js"


const router: Router = Router();

// READ all
router.get("/", (req, res) => {
  res.send("List of course");
});

router.get("/courses",(req:Request,res:Response) => {
    return res.json({
        data : courses
    })
});

// Params URL 
router.get("/api/v2/courses/:courseId", (req:Request,res:Response) => {
    const courseId = Number(req.params.courseId);
    const result = zCourseId.safeParse(courseId);
    const foundIndex = courses.findIndex(
      (course) => course.courseId === courseId
    );

    if(!result.success){
        return res.status(400).json({
        success : false,
        message : "Validation failed",
        errors : result.error.issues[0]?.message,
    })
    }

    if(foundIndex === -1){
        return res.status(404).json({
        success : false,
        errors :"Course does not exists",
    })
    }
    res.set("Link", `/courses/${courseId}`);

    return res.json({
        success : true,
        message : `Get course ${courseId} successfully`,
        data : courses[foundIndex]
    })
});

router.post("/api/v2/courses", (req:Request,res:Response) => {
   
        const body = req.body as Course;
        const result = zCoursePostBody.safeParse(body);

        if (!result.success){
        return res.status(400).json({
        message: "Validation failed",
        errors: result.error.issues[0]?.message,
      });
    }

    const found = courses.find((course) => course.courseId === body.courseId);

    if(found){
        return res.status(409).json({
        success: false,
        message: "Course Id is already exists",
      });
    }

    

    const new_course = body;
    courses.push(new_course);


    res.set("Link", `/courses/${new_course.courseId}`);

    return res.status(201).json({
      success: true,
      data: new_course,
    });
});


router.put("/api/v2/courses", (req:Request,res:Response) => {
   
        const body = req.body as Course;
        const result = zCoursePutBody.safeParse(body);

        if (!result.success){
        return res.status(400).json({
        message: "Validation failed",
        errors: result.error.issues[0]?.message,
      });
    }

     const foundIndex = courses.findIndex(
      (course) => course.courseId === body.courseId
    );
    res.set("Link", `/courses/${body.courseId}`);

    if(foundIndex === -1 ){
        return res.status(409).json({
        success: false,
        message: "Course does not exists",
      });
    }

     courses[foundIndex] = { ...courses[foundIndex], ...body };

    

    

    return res.status(201).json({
      success: true,
      message: `course ${body.courseId} has been updated successfully`,
      data: courses[foundIndex],
    });
});


router.delete("/api/v2/courses", (req:Request,res:Response) => {
   
        const body = req.body as Course;
        const result = zCourseDeleteBody.safeParse(body);

        if (!result.success){
        return res.status(400).json({
        message: "Validation failed",
        errors: result.error.issues[0]?.message,
      });
    }

     const foundIndex = courses.findIndex(
      (course) => course.courseId === body.courseId
    );

    if(foundIndex === -1 ){
        return res.status(409).json({
        success: false,
        message: "Course does not exists",
      });
    }

     courses.splice(foundIndex, 1);
    

    

    return res.status(201).json({
      success: true,
      message: `course ${body.courseId} has been deleted successfully`,
      data: courses[foundIndex],
    });
});


export default router;
