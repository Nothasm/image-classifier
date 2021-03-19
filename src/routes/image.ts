import { Router } from "express";
import wrapper from "express-async-handler";
import multer from "multer";
import { getUrlFromFileName, rekognition, uploadFile } from "../utils/aws";
import md5 from "md5";
import { image } from "../models/image";
import { env } from "../config";

const file = multer()

const router = Router();

router.post("/upload", file.single("image"), wrapper(async (req, res) => {

    if (!req.file) throw new Error("You nedd to select an image");

    const imageExists = await image.findOne({ md5: md5(req.file.buffer)});
    
    if (imageExists) throw new Error("Image already exists on database");

    const analisys = await rekognition
        .detectCustomLabels({
            ProjectVersionArn: env.projectArn,
            Image: {
                Bytes: req.file.buffer
            }
        })
        .promise()

    const hashImage = md5(req.file.buffer);

    const fileName = await uploadFile(req.file.buffer);

    image.create({
        fileName,
        md5: hashImage,
        analisys: JSON.stringify(analisys)
    })

    res.send({
        analisys,
        imageUrl: await getUrlFromFileName(fileName)
    });
}));

export { router as ImageRouter };
