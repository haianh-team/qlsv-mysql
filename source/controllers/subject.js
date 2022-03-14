const Subjects = require('../models/subjects');
const db = require('../models/index');
const Student = require('../models/student');
module.exports.renderSubject = async (req, res) =>{
    const subjects = await db.Subjects.findAll({include:[{model: db.Student}]});
    console.log(subjects);
    res.render('subject/index',{subjects})
}
module.exports.getCreateSubject = async (req, res)=>{
     
       res.render('subject/createsubject')
}
module.exports.createSubject = async (req,res) =>{
    const nameS = req.body.nameS;
    const sotc = req.body.sotc;
    const subject = await db.Subjects.create({nameS:nameS,sotc:sotc});
    res.redirect('/createSubject')

}
module.exports.getEditSubject = async (req, res) =>{
    const idSubject = req.params.id;
    const subject = await db.Subjects.findOne({where:{id:idSubject}});
    res.render('subject/editsubject',{subject})
}
module.exports.putEditSubject = async (req, res) =>{
    const idSubject = req.params.id;
    const nameS = req.body.nameS;
    const sotc = req.body.sotc;

    const subject = await db.Subjects.update({nameS:nameS,sotc:sotc},{where:{id:idSubject}});
    res.redirect('/home')
}