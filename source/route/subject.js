const express = require('express');
const subject_router = express.Router();
const homepage = require('../controllers/subject');

subject_router
    .route('/subject')
    .get(homepage.renderSubject);

subject_router
   .route('/createsubject')
   .get(homepage.getCreateSubject)
   .post(homepage.createSubject);
subject_router
   .route('/edit/subject/:id')
   .get(homepage.getEditSubject)
   .put(homepage.putEditSubject);
//    subject_router
//    .route('/deletsubject/:id')
//    .delete(homepage.deleteUser);
module.exports = subject_router;
