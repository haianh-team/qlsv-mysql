const express = require('express');
const khoa_router = express.Router();
const homepage = require('../controllers/khoa');

khoa_router
      .route('/khoa')
      .get(homepage.renderKhoa)

khoa_router
   .route('/createkhoa')
   .get(homepage.getCreateKhoa)
   .post(homepage.createKhoa);
   khoa_router
   .route('/edit/khoa/:id')
   .get(homepage.getEditKhoa)
   .put(homepage.putEditKhoa);
// khoa_router
//     .route('/delete/khoa/:id')
//     .delete(homepage.deleteKhoa);
module.exports = khoa_router;