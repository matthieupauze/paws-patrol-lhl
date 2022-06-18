import { NextFunction, Request, Response } from 'express';
import path from 'path';
require('dotenv').config({ path: path.resolve(process.cwd(), '../.env') });
const { VITE_PORT_REACT } = process.env;

const disableCors = (req: Request, res: Response, next: NextFunction) => {
  console.log('This is being called');
  res.setHeader('Access-Control-Allow-Origin', `http://localhost:${VITE_PORT_REACT}`);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
};

export { disableCors };
