import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken';

interface ITokenPayLoad {
    iat: number;
    exp: number;
    sub: string;
}

export default function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    // pega o token do cabeçalho de auth da req
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error('Token JWT não encontrado.');
    }

    const [, token] = authHeader.split(' ');

    try {
        const decodedToken = verify(token, '56f33c51b6200f561a1fc27bc6df722226aaacabd6a2598fa09d129105b3ed88')

        const { sub } = decodedToken as ITokenPayLoad;

        request.user = {
            id: sub,
        };

        return next();
    } catch {
        throw new Error('Token JWT inválido.')
    }
}