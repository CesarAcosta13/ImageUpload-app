const express = require('express');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const engine = require('ejs-mate');
const uuid =require('uuid/v4');
const {format} = require('timeago.js');

//Initializations
const app = express();
require('./database');

//settings
app.set('views', path.join(__dirname,'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);


//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
   destination: path.join(__dirname, 'public/img/uploads'), 
   filename: (req, file, cb, filename )=>{
       cb(null, uuid() + path.extname(file.originalname));
   } 
});
app.use(multer({
    storage, 
}).single('image'));


//global variables
app.use((req, res, next) =>{
    app.locals.format = format
    next();
});


//routes
app.use('/', require('./routes/index-route'))


//static file
const dir = path.join(__dirname ,'public');
console.log(dir);
app.use(express.static(dir));

//starting the app
app.listen(app.get('port') , () =>{
    console.log('server on port' ,app.get('port') )
});