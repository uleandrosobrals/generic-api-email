const express = require('express');
const cors = require('cors')
const routes = require('./routes/routes.js')
require('dotenv').config()
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
process.env.TZ = 'America/Sao_Paulo';
const pack = require('../package.json');




let corsOptions = {
  "origin":"*",
  "methods":"GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  "prefligthContinue":false
}


const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: pack.name,
            description: pack.description,
            version: '1.0.2',
            contact: {
                name: pack.author,
                email: "leosobral.dev@gmail.com"
            },
            "servers": [
                {
                    "url": "http://localhost:3030",
                    "description": "Development server"
                },
                {
                    "url": "http://localhost:3030",
                    "description": "Production server"
                }
            ]
        }
    },
    // ['.routes/*.js']
    apis: ['./src/routes.js'],
};
// initialize swaggerJSDoc
const swaggerDocs = swaggerJsDoc(swaggerOptions);
var swaggerSpec = swaggerDocs;
const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// route for swagger.json
app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});


// upload de arquivos



app.use(cors(corsOptions))
app.use(express.json())
app.use(routes);
app.options('*',cors())

const PORT = process.env.PORT || 3030

app.listen(PORT, function(){
  console.log('API iniciada ouvindo porta '+ PORT+'...')
})

