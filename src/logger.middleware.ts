import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class middleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...', req.body, req.baseUrl);
    next();
  }
}

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request...`, req.method, req.body);
  next();
}
