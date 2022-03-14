const db = require('../models/index');
const Khoa = require('../models/khoa');
const Student = require('../models/student');
const { Sequelize, QueryTypes } = require('sequelize');
const Op = Sequelize.Op;
//học sinh có tên bât đầu bằng chữ n
module.exports.sapxeplastNameA = async (req,res) => 
{
    let studentA =   await db.Student.findAll({where:
  {lastName: {
      [Op.like]: 'n%'
  }} });
  console.log(studentA)
  res.render('sapxep/lastname',{studentA})
}
     //sắp xếp môn học theo bảng chữ cái
module.exports.sapxepnameS = async (req, res, next) => {
 
  const subjects= await db.Subjects.findAll({order:[
    'nameS'
  ]});
  console.log(subjects)
  res.render('sapxep/nameS',{subjects})
}
