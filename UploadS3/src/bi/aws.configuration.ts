
import { findByIdBuro, insertMongoBuro, mongoConnect } from "./mongoControllet";

var AWS = require("aws-sdk");
var path = require("path");
var fs = require("fs");

export async function uploadS3(path: any, deviceID: any, pathOriginal: any) {
  try {
    // Set the region
    AWS.config.update({ region: "us-east-1" });

    // Create S3 service object
    let s3 = new AWS.S3({
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.ACCESS_SECRET_KEY,
      apiVersion: "2006-03-01",
    });

    // call S3 to retrieve upload file to specified bucket
    let uploadParams = { Bucket: "subir-imagenes-aws", Key: "", Body: "" };

    let fileStream = fs.readFileSync(path);

    // Configure the file stream and obtain the upload parameters
    uploadParams.Body = fileStream;
    uploadParams.Key = `${deviceID}/${pathOriginal}`;

    var docsMongo: any = await findByIdBuro(deviceID, pathOriginal);

    if (docsMongo.length == 0) {
      s3.upload(uploadParams, async function (err: any, data: any) {
        if (err) {
          throw err;
        }
        await insertMongoBuro({
          deviceID: deviceID,
          path:
          pathOriginal,
        });
        console.log(`File uploaded successfully. ${data.Location}`);
      });
    }else{
        console.log('Imagen ya subida')
    }
  } catch (error) {
    throw error;
  }
}
