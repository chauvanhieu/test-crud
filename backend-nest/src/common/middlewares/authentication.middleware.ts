import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from '../jwt/jwt';

@Injectable()
export class authMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization
            if (!token) {
                throw new ForbiddenException("Không có quyền truy cập")
            }
            const user = await verify(token.split(" ")[1])
            if (!user) {
                throw new ForbiddenException("Không có quyền truy cập")
            }
            next();
        } catch (error) {
            // xử lý lỗi
            throw new ForbiddenException("Không có quyền truy cập")
        }
    }
}
