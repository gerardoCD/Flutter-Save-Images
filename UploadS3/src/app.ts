import bodyParser from 'body-parser';
import express from 'express';
import { UploadDocumentS3 } from './controllers/uploadS3.controller';
var fileupload = require("express-fileupload");
// const schemas = require('banca-movil-schemas/schemas');
const app: express.Application = express();


// Middlewares Before controllers
app.use(bodyParser.json());

app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// Enviar Mail
app.use('/UploadDocumentS3', [
    UploadDocumentS3,
]);



// Error Handler
// app.use(ErrorHandler());

export default app;
