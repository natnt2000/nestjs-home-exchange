import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';

export const editFileName = (req: Request, file: any, callback: any) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  callback(null, `${name}-${uuidv4()}${fileExtName}`);
};
