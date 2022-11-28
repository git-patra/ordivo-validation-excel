import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { HttpException, HttpStatus } from '@nestjs/common';

const fileFilter = (req, file, callback) => {
  if (file.originalname.match(/.*\.(xlsx|xls)/g)) {
    callback(null, true);
  } else {
    callback(
      new HttpException(
        `Unsupported file type ${extname(file.originalname)}`,
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
};

const editFileName = (req, file, callback) => {
  callback(null, file.originalname);
};

export const StoreFileConfig: MulterOptions = {
  storage: diskStorage({
    destination: `./uploads/excel`,
    filename: editFileName,
  }),
  // fileFilter: fileFilter,
  limits: { fileSize: 10 * 10000 },
  fileFilter: fileFilter,
};

export function getFilePath(file: Express.Multer.File): string {
  const path = file.path.split('\\');
  path.shift();
  return path.join('/');
}
