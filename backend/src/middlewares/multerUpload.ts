import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { ValidationError } from '../utils/AppError';

const multerStorage = multer.memoryStorage();

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (!file.mimetype.startsWith('image')) {
    return cb(new ValidationError('Wrong image type'));
  }

  cb(null, true);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const savePhotoInMemory = upload.any();
