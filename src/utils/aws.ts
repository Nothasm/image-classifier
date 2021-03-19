import AWS from 'aws-sdk'
import { randomBytes } from "crypto";
import fileType from "file-type";
import { accessKeyId, bucket, secretAccessKey } from '../config';

AWS.config.update({
    accessKeyId,
    secretAccessKey
});

export const rekognition = new AWS.Rekognition({
    apiVersion: '2016-06-27',
    region: "us-east-2",
});

export const s3 = new AWS.S3({
    signatureVersion: "v4",
    region: "us-east-2"
});

export async function uploadFile(data: Buffer) {
    const type = await fileType.fromBuffer(data);
  
    const acceptedTypes = ["image/jpeg"];
  
    if (type && !acceptedTypes.includes(type.mime)) throw new Error("Imagem inválida");
  
    const fileName = `${randomBytes(10).toString("hex")}.${type ? type.ext : "jpeg"}`;
    
    await s3.putObject({
      Bucket: bucket,
      Key: fileName,
      Body: data,
      ContentType: type ? type.mime : "image/jpeg",
      ACL: "private"
    }).promise().then(result => {
      if (result.$response.error)
        throw result.$response.error;
      return result;
    });
  
    return fileName;
  }

  async function signUrl(params: any): Promise<string> {
    return await new Promise((resolve, reject) => {
      s3.getSignedUrl("getObject", params, (err, url) => {
        if (err)
          reject(err);
        else
          resolve(url);
      });
    });
  }

  export async function getUrlFromFileName(fileName: string): Promise<string> {
    const body = {
      Bucket: bucket,
      Key: fileName,
      Expires: 1800 // in seconds
    };
  
    return await signUrl(body);
  };