const db = require('../models/index');
const Khoa = require('../models/khoa');
const Student = require('../models/student');

module.exports.renderKhoa = async (req, res, next) => {
  
     const khoas = await db.Khoa.findAll(
         {include: [{model:db.Student}]}
     );
     console.log(khoas[0]);
     res.render('khoa/index',{khoas})

}
module.exports.getCreateKhoa = async (req, res, next) => {
    res.render('khoa/createkhoa.ejs')
}

module.exports.createKhoa = async (req, res, next) => {
    const nameK = req.body.nameK;
    const khoa = await db.Khoa.create({nameKhoa:nameK});
    console.log(khoa);
    res.redirect('/createkhoa');
}
module.exports.getEditKhoa = async (req, res)=>{
   const idKhoa = req.params.id;
   const khoa = await db.Khoa.findOne({where:{id:idKhoa}})
   res.render('khoa/editkhoa',{khoa})

}
module.exports.putEditKhoa = async (req, res) => {
    const idKhoa = req.params.id;
   const nameK = req.body.nameK;
   const khoa = await db.Khoa.update({nameKhoa:nameK},{where:{id:idKhoa}})
   res.redirect('/home')
}
// module.exports.deleteKhoa = async (req, res) => {
//     const idKhoa = req.params.id;
//     const khoa = await db.Khoa.findOne({where:
//         {id:idKhoa},
//         include:[{model:{db.S}}]
//     });
//     await khoa.destroy();
    
//     res.redirect('/home')
// }