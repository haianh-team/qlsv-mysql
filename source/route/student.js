const express = require('express');
const student_router = express.Router();
const homepage = require('../controllers/student');
student_router.get('/home',homepage.getHomePage);
student_router
   .route('/createstudent')
   .get(homepage.getCreateStudent)
   .post(homepage.createStudent);
student_router
   .route('/editstudent/:id')
   .get(homepage.getEditStudent)
   .put(homepage.putEditStudent);
student_router
   .route('/delete/student/:id')
   .delete(homepage.deleteStudent);
module.exports = student_router;
