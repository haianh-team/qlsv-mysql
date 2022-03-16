const mysql = require('mysql');


const db = require('../models/index');
const User = require('../models/user')
const { Sequelize, QueryTypes } = require('sequelize');

const Op = Sequelize.Op;
// Connection Pool
// let connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME
// });
const sequelize = new Sequelize( process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  Port: 3306
})
const connect1 = async () =>{
  try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
}
connect1();
// async function main(){
//   await sequelize.sync({force: true});
// }
// main()
// View Users
exports.view = async (req, res) => {

  // User the connection
  
  try {
     await db.User.findAll({raw:true})
    .then(rows =>{
      
      res.render('home', {rows:rows});
    });
 
    
  }
  catch (err) {
    console.log(err)
  }
}

// Find User by Search
exports.find = async (req, res) => {
 
  // User the connection
  // connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
  //   if (!err) {
  //     res.render('home', { rows });
  //   } else {
  //     console.log(err);
  //   }
  //   console.log('The data from user table: \n', rows);
  // });
  try {
    const firstName = req.body.search;
    console.log(firstName)
    let rows = await db.User.findAll({where:{firstName:{[Op.like]:`%${firstName}%`}}});
    console.log(rows);
    res.render('home',{rows:rows});
  }
  catch (err) {
    console.log(err)
  }
}

exports.form = (req, res) => {
  res.render('add-user');
}

// Add new user
exports.create = async (req, res) => {
  // const { first_name, last_name, email, phone, comments } = req.body;
  // let searchTerm = req.body.search;

  // User the connection
  // connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?', [first_name, last_name, email, phone, comments], (err, rows) => {
  //   if (!err) {
  //     res.render('add-user', { alert: 'User added successfully.' });
  //   } else {
  //     console.log(err);
  //   }
  //   console.log('The data from user table: \n', rows);
  // });
  const firstName= req.body.firstName;
  const lastName= req.body.lastName;
  const email= req.body.email;
  const phone= req.body.phone;
  const id = req.params.id;
  const user = await db.User.create({firstName:firstName,lastName:lastName,email:email,phone:phone},{where:{id:id}})
  res.redirect('/')
}


// Edit user
exports.edit = async (req, res) => {
  // const id = req.params.id;
  // const rows = await db.User.update({where:{id:id}});

  // User the connection
  // connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
  //   if (!err) {
  //     res.render('edit-user', { rows });
  //   } else {
  //     console.log(err);
  //   }
  //   console.log('The data from user table: \n', rows);
  // });
  const id = req.params.id;
  const rows = await db.User.findOne({raw:true},{where:{id:id}});
  console.log(rows)
  res.render('edit-user', { rows });
}


// Update User
exports.update = async (req, res) => {
  // const { first_name, last_name, email, phone, comments } = req.body;
  // User the connection
  // connection.query('UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?', [first_name, last_name, email, phone, comments, req.params.id], (err, rows) => {

  //   if (!err) {
  //     // User the connection
  //     connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
  //       // When done with the connection, release it
        
  //       if (!err) {
  //         res.render('edit-user', { rows, alert: `${first_name} has been updated.` });
  //       } else {
  //         console.log(err);
  //       }
  //       console.log('The data from user table: \n', rows);
  //     });
  //   } else {
  //     console.log(err);
  //   }
  //   console.log('The data from user table: \n', rows);
  // });
  // const id = req.params.idHs;
  const firstName= req.body.firstName;
  const lastName= req.body.lastName;
  const email= req.body.email;
  const phone= req.body.phone;
  const id = req.params.id;
  console.log(id);
  console.log({firstName,lastName,email,phone})
  await db.User.update({firstName:firstName,lastName:lastName,email:email,phone:phone},{where:{id:id}});
  const rows = await db.User.findAll({})
  res.render('home',{rows:rows})
  // res.json({redirected:true})
}

// Delete User
exports.delete = async (req, res) => {
console.log("aaaaaaaa");
  // Delete a record

  // User the connection
  // connection.query('DELETE FROM user WHERE id = ?', [req.params.id], (err, rows) => {

  //   if(!err) {
  //     res.redirect('/');
  //   } else {
  //     console.log(err);
  //   }
  //   console.log('The data from user table: \n', rows);

  // });

  // Hide a record

  // connection.query('UPDATE user SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
  //   if (!err) {
  //     let removedUser = encodeURIComponent('User successeflly removed.');
  //     res.redirect('/?removed=' + removedUser);
  //   } else {
  //     console.log(err);
  //   }
  //   console.log('The data from beer table are: \n', rows);
  // });
  const id = req.params.id;
  console.log('The data from user table')
  const rows = await db.User.destroy({where:{id:id}});
  res.redirect('/')


}

