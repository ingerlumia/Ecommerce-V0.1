import multer from 'multer';
import {v4 as uuid} from 'uuid';

const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null,'./uploads');
    },
    filename(req,file,cb){
        const id = uuid();
        const extention = file.originalname.split('.').pop();
        const filename =`${id}.${extention}`;
        cb(null,filename);
    },
});


export const uploadFie = multer({storage}).array('images',6);
export const upload = multer({storage}).single('image');

export const singleFileUpload = multer({storage}).single('avatar');

const storageX = multer.memoryStorage();
export const uploadNone = multer({ storageX });
