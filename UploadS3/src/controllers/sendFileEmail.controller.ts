// import { wrap } from 'async-middleware';
// import { Request, Response, Router } from 'express';
// import { EmailParams, Attachment } from '../model/mail';
// import { processEmail, sendEmail } from '../bll/sendMailBL';
// import { DB } from '../db/dbController';
// const router: Router = Router();

// router.post("", wrap(async (req: any, res: Response) => {

//     try {

//         const email = req.body.email;
//         const subjec = req.body.subjec
//         await sendEmail(subjec, email, 2, null,req.files.name.data, req.body.fileName);
//         res.status(200).send({
//             "message": "correo enviado correctamente"
//         })

//     } catch (error) {
//     console.log('error :', error);
//         res.status(400).send(error);
//     // }
    
// }));

// export const SendFileController: Router = router;
