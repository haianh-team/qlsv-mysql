const express = require('express');
const find_router = express.Router();
const homepage = require('../controllers/find');

find_router
    .route('/find/findstudent')
    .get(homepage.getFindStudent)
find_router
    .route('/find/findstudent1')
    .get(homepage.getFindStudent1)
    find_router
    .route('/find/findnamekhoa')
    .get(homepage.getFindNameKhoa)
module.exports = find_router;