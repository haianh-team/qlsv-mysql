const express = require('express');
const exphbs = require('express-handlebars');
//const bodyParser = require('body-parser'); // No longer Required
//const mysql = require('mysql'); // Not required -> moved to userController
const mysql = require('mysql');
const { Sequelize, QueryTypes } = require('sequelize');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
require('dotenv').config();
const Handlebars = require('handlebars');
var methodOverride = require('method-override');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

// Parsing middleware
// Parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.urlencoded({ extended: true })); // New

// Parse application/json
// app.use(bodyParser.json());
app.use(express.json()); // New
app.use(methodOverride('_method'))

// Static Files
app.use(express.static('public'));

// Templating Engine

const handlebars = exphbs.create({
     extname: '.hbs',
     handlebars: allowInsecurePrototypeAccess(Handlebars), 
     partialsDir: path.join(__dirname, "views", "partials"),
     layoutsDir: path.join(__dirname, "views", "layouts"), 
     helpers: {
         compare : function (rows){
          for (let i =0;i<rows.length;i++){
              console.log(rows[i]);
          }
         }

     }
    });
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

// You don't need the connection here as we have it in userController
// let connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME
// });

const routes = require('./server/routes/user');
app.use('/', routes);

app.listen(2000, () => console.log(`Listening on port 2000`));
//fsfsdf