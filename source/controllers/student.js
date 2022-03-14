
const db = require('../models/index');
const Student =require('../models/student');
const Lop = require('../models/lop');
const Subjects = require('../models/subjects');
const Khoa = require('../models/khoa');
const StudentSubject = require('../models/studentSubjects');
const { Sequelize, QueryTypes } = require('sequelize');
const Op = Sequelize.Op;
  //tim ra học sinh học hết tất cả môn học
  const sequelize = new Sequelize('6P4KRNGFaz', '6P4KRNGFaz',"2LemUcMr1X", {
    host: 'remotemysql.com',
    dialect: 'mysql',
    Port: 3306
})
// const StudentSubject = require('../models/studentSubject')
module.exports.getHomePage =  async (req, res, next) => {
    try {
        let data = await db.Student.findAll({
            include: [
                { model : db.Subjects},
                { model: db.Khoa}
            ]
        });
        console.log(data)
        res.render('student/homepage.ejs',{data});
    } catch (error) {
        console.log(error)
    }
}
module.exports.getCreateStudent = async (req, res, next) => {

    const subjects = await db.Subjects.findAll({});
    const khoas = await db.Khoa.findAll({})
    res.render('student/createstudent.ejs',{subjects,khoas});
}
module.exports.createStudent = async (req, res, next) => {
    try {
        const {lastName,email} = req.body;

        const nameSubjects = req.body.nameS;
        const nameK = req.body.nameK; 
        
        const khoa = await db.Khoa.findOne({where:{nameKhoa:nameK}});
        console.log(khoa)
        const idKhoa = khoa.id;
        const creatStudent = await db.Student.create({lastName:lastName,email:email,KhoaId:idKhoa});
        console.log(creatStudent)
        for(let i = 0;i<nameSubjects.length;i++){
            let subject = await db.Subjects.findOne({where:{nameS:nameSubjects[i]}})
            creatStudent.addSubjects(subject)
        }
        let a1 = await sequelize.query(`
   
        CREATER TRIGGER  trigger_student ON Users
     
     
        after insert AS
        BEGIN
     
         INSERT INTO db.Students (id)
         SELECT id
         FROM inserted
         END
     `)
     console.log(a1)
        res.redirect('/createstudent');
    } catch (error) {
        console.log(error)
    }
}
module.exports.getEditStudent = async (req, res, next) => {
    try {
        const studentId = req.params.id;
        let data = await db.Student.findOne({
            where:{id:studentId},
            include:[
                { model :db.Subjects},
                { model: db.Khoa}
            ]
          });
       
        res.render('student/editstudent.ejs',{data});
    } catch (error) {
        console.log(error)
    }
}
module.exports.putEditStudent = async (req, res, next) => {
    try {
        const studentId = req.params.id;
        const lastName = req.body.name;
        const email = req.body.email;
        const nameS = req.body.nameS;
        const nameK = req.body.nameK;
        const khoa = await db.Khoa.findOne({where:{nameKhoa:nameK}});
        const idKhoa = khoa.id;
        let student = await db.Student.findOne({
            where:{id:studentId},
            include:[
                { model :db.Subjects },
                { model: db.Khoa }
            ]
        })
       const student_update = await db.Student.update({lastName:lastName,email:email,KhoaId:idKhoa},{where:{id:studentId}});
      
         const subjectsF = await db.Subjects.findAll({});
         for(let i = 0; i < subjectsF.length; i++) {
            await subjectsF[i].removeStudent(student)
         }
        const subjectsA = await db.Subjects.findAll({where:
                 {
                     nameS:[nameS]
            }
        });
 
         for(let i = 0; i < subjectsA.length; i++) {
           await student.addSubjects(subjectsA[i])
         }
        res.redirect('/home')
    } catch (error) {
        console.log(error)
    }
}

module.exports.deleteStudent = async (req, res, next) => {
    try {
        const studentId = req.params.id;
        await db.Student.destroy({where:{id:studentId}})
        res.redirect('/home')
    } catch (error) {
        console.log(error)
    }
}
