import {Request} from "express";
import {Image} from '../models/image';

const ImageTransformers={
    apply: async (req: Request, images: Image[])=>{

        let compress = req.body.compress;
        let resize = req.body.resize;
        let rotate = req.body.rotate;

        if(compress)
            ImageTransformers.compress(compress, images);

        if(resize)
            ImageTransformers.resize(compress, images);

        if(rotate)
            ImageTransformers.rotate(compress, images);

    },

    resize: (resizePercent: number,  images: Image[])=>{
        //Resize logic here

    },
    compress: (compressPercent: number, images: Image[])=>{
        //Compress logic here

    },
    rotate: (rotatePercent: number, images: Image[])=>{
        //Rotate logic here

    }

}

export default ImageTransformers;