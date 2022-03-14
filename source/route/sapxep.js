const express = require('express');
const sapxep_router = express.Router();
const homepage = require('../controllers/sapxep');

sapxep_router
   .route('/sapxep/lastname')
   .get(homepage.sapxeplastNameA)
sapxep_router
   .route('/sapxep/nameS')
   .get(homepage.sapxepnameS)

module.exports = sapxep_router;