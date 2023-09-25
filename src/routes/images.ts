import { Router, Request, Response } from 'express';
import { Image } from '../models/image';
import multer from 'multer';
import path from "path";
import {addImageToStorage, sendResponse} from "../helpers";
import ImageTransformers from "../helpers/image-transformers";
require('dotenv').config();

const router = Router();
let images: Image[] = [];


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../uploads'))
    },
    filename: function (req, file, cb) {
        const fileInfo=path.parse(file.originalname);
        const name=fileInfo.name;
        const extension=fileInfo.ext;

        const fileName=`${name}-${Date.now()}${extension}`;
        cb(null, fileName);
    },

});

const multi_upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * Number(process.env.MAX_FILE_SIZE) },
    fileFilter: (req, file, cb) => {

        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            const err = new Error('Only .png, .jpg and .jpeg format allowed!')
            err.name = 'ExtensionError'
            return cb(err);
        }
    },
}).array('images', Number(process.env.MAX_NUMBER_OF_FILES))


router.post('/upload', (req, res) => {

    if(!req.files)
    {
        sendResponse(res, `Please specify at least one file to upload`, 400);
        return;
    }

    multi_upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            sendResponse(res, `Multer uploading error: ${err.message}`, 500);
            return;
        } else if (err) {
            if (err.name == 'ExtensionError') {
                sendResponse(res, err.message, 413);
            } else {
                sendResponse(res, `Unknown uploading error: ${err.message}`, 500);
            }
            return;
        }
        let uploadedImages=addImageToStorage(images, req.files as any[]);
        await ImageTransformers.apply(req, uploadedImages);
        res.json(uploadedImages);
    })
});


router.get('/', (req: Request, res: Response) => {
    res.json(images);
});

router.get('/:id', (req: Request, res: Response) => {
    const image = images.find((t) => t.id === req.params.id);

    if (!image) {
        sendResponse(res, 'Image not found',404);
    } else {
        let filepath=path.join(__dirname, `../../uploads/${image.name}`)
        res.sendFile(filepath);
    }
});

export default router;