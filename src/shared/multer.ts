import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  }
});

export const fileFilter = (req: any,file: any,cb: any) => {
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype ===  'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Image uploaded is not of type jpg/jpeg or png'), false);
  }
}
