import {Image} from '../models/image'
import { v4 as uuidv4 } from 'uuid';
export * from './response'

export const addImageToStorage=(storage: Image[], files: any[])=> {
    const uploadedImages: Image[]=[];
    files.forEach(file=>{
        let img: Image={
            id: uuidv4(),
            name: file.filename
        }
        uploadedImages.push(img);
        storage.push(img);
    });
    return uploadedImages;
}
