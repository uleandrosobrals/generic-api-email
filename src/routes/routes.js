const { Router } = require('express');
const emailtxt = require('../controllers/emailController');
const multer = require ('multer');
const fs = require('fs');
const path = require ('path');
var axios = require("axios").default;

const routes = Router();


/**
* @swagger
* /api/v1/emailtxt:
*   post:
*     tags:
*        - email
*     description: envio de email de apenas texto
*     produces:
*        - application/json 
*     responses:
*       '200':
*         description: Retorna email enviados
*/
routes.post('/api/v1/emailtxt', emailtxt.mailText);


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if(!fs.existsSync(__dirname+'/temp')){
        fs.mkdirSync(__dirname+'/temp')
    }
    cb(null, path.resolve(__dirname, './temp'));
  },
  filename: (req, file, cb)=>{
    cb(null, file.originalname)
  }
});

const upload = multer({storage});

routes.post('/api/v1/upload', upload.array('file'), emailtxt.mailText);




module.exports = routes
