const transporter = require('../connection/connection');
// const storage = require('../multerConfig');
require('dotenv/config');
require('../config/multerConfig');



module.exports={
  async mailText(req, res) {
    try{
      console.log(req.query);
      // JSON.parse(req.body);
      const{to,bcc,subject,text,html}= req.query // de onde mandam os dados de requisição
           
      // console.log(req.files)
      let attachments = []
      for(let i = 0; i<req.files.length; i++ ){
        let fileDetails = {
          filename: req.files[i].filename,
          path: req.files[i].path
        }
        attachments.push(fileDetails)
      }
      
      const mailSent = await transporter.sendMail({
        from: process.env.HOST_MAIL, // endereço de email
        to: to, // lista de email a ser enviado
        bcc: bcc,
        subject: subject, // titulo
        text: text, // texto do email
        html: html, // conteudo em formato html
        attachments: attachments
      });
    
      // console.log(mailSent)
  
      return res.json({
    "type":"information",
    "mensage":"E-mail enviado com exito!"
  });
    }catch(error){
      console.log(error)
      return res.status(500).json({
        "type":"erro",
        "mensage": error.mensage
      });
    }
  }
//   async mailJson(req, res) {
//     try{
//       let(text,html)= req.body
//       const parserObj = new Parser();
//       const csv = parserObj.parse();
//       console.log(csv);
//   }catch(error){
//     console.log(error)
//     return res.status(500).json({
//       "type":"erro",
//       "mensage": error.mensage
//     });
//   }
// }
}