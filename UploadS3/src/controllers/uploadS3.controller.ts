import { wrap } from 'async-middleware';
import { Request, Response, Router } from 'express';
import { uploadS3 } from '../bi/aws.configuration';
const router: Router = Router();

router.post("", wrap(async (req: any, res: Response) => {


    try {
        
        const pathImage = req.files.pathImage.tempFilePath;
        console.log('pathImage :', pathImage);
        const deviceId = req.body.deviceId;
        console.log('deviceId :', deviceId);

        await uploadS3(pathImage,deviceId );


        res.status(200).send({
            "message": "Enviado Correctamente"
        });
    } catch (error) {
    console.log('error :', error);
        res.status(400).send(error);
    }
    
}));

export const UploadDocumentS3: Router = router;
