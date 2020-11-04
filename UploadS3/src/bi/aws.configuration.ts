var AWS = require("aws-sdk");
var path = require("path");
var fs = require("fs");
export async function uploadS3(path: any,deviceID: any) {
  try {
    // Set the region
    AWS.config.update({ region: "us-east-1" });

    // Create S3 service object
    let s3 = new AWS.S3({
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.ACCESS_SECRET_KEY,
        apiVersion: "2006-03-01" });

    // call S3 to retrieve upload file to specified bucket
    let uploadParams = { Bucket: "flutter-images-gcd", Key: "", Body: "" };

    let fileStream = fs.readFileSync(path)

    // Configure the file stream and obtain the upload parameters
    uploadParams.Body = fileStream;
    uploadParams.Key = `${deviceID}/${Date.now()}.jpg`;
    console.log('uploadParams.Key :', uploadParams.Key);

    // call S3 to retrieve upload file to specified bucket
        // Uploading files to the bucket
        s3.upload(uploadParams, function(err: any, data: any) {
            if (err) {
                throw err;
            }
            console.log(`File uploaded successfully. ${data.Location}`);
        });
  } catch (error) {
  console.log('error :', error);
      throw error
  }
}
