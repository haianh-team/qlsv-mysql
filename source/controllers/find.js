const db = require('../models/index');
const Khoa = require('../models/khoa');
const Student = require('../models/student');
const { Sequelize, QueryTypes } = require('sequelize');
const Op = Sequelize.Op;
  //tim ra học sinh học hết tất cả môn học
  const sequelize = new Sequelize('6P4KRNGFaz', '6P4KRNGFaz',"2LemUcMr1X", {
    host: 'remotemysql.com',
    dialect: 'mysql',
    Port: 3306
})
module.exports.getFindStudent =async(req, res)=>{ 
    let findStudent = await sequelize.query(
    `SELECT StudentId,Students.lastName,count(StudentId) as 'countSubject'
     FROM StudentSubjects,Students 
     WHERE  StudentSubjects.StudentId=Students.id 
     GROUP by StudentId,Students.lastName 
     HAVING count(StudentId) = (SELECT count(id) FROM Subjects)`,{
    model:db.studentsubjects,
    include:[{model:db.students},{model:db.subjects}],
    type: QueryTypes.SELECT
  })
  console.log(findStudent)
  res.render('find/findstudent',{findStudent});
}
  // lấy ra môn học có số tc lớn hơn 3 và có nhìu học sinh nhất
module.exports.getFindStudent1 = async (req, res)=>{
    let findStudent1 = await sequelize.query(
        `SELECT Subjects.nameS,SubjectId,count(SubjectId) as 'countSubject'
         FROM StudentSubjects,Subjects
         WHERE  StudentSubjects.SubjectId = Subjects.id AND Subjects.sotc>3
         GROUP by Subjects.nameS,SubjectId
         ORDER BY countSubject DESC 
         LIMIT 1`,{
        model:db.studentsubjects,
        include:[{model:db.students},{model:db.subjects}],
        type: QueryTypes.SELECT
      })
      res.render('find/findStudent1',{findStudent1})
}
  // lay ra khoa co nhiu hs hoc mon toan nhat
module.exports.getFindNameKhoa = async (req, res)=>{
  let findNameKhoa = await sequelize.query(
    
    `SELECT nameKhoa from Khoas,(SELECT KhoaId,count(KhoaId) from Students,(SELECT DISTINCT StudentId,Subjects.nameS from StudentSubjects,Subjects,Students
     Where StudentSubjects.SubjectId = Subjects.id AND Subjects.nameS = 'toán') as t
     where id = t.StudentId
     group by KhoaId
     LIMIT 1) as k
     where id = k.KhoaId`
,{
    model:db.studentsubjects,
    model:db.khoas,
    include:[{model:db.students},{model:db.subjects}],
    type: QueryTypes.SELECT
  })
  console.log(findNameKhoa)
  res.render('find/namekhoa',{findNameKhoa})
} 
  

