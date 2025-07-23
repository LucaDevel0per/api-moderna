import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { prisma } from '../lib/prisma'

interface IRequest {
    email: string
    password: string
}

interface IResponse {
    user: {
        id: string;
        name: string | null;
        email: string
    };
    token: string
}

class CreateSessionService {
    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new Error('Password or email incorrect. Try Again');
        }

        const passwordMatch = await compare(password, user.password);
        
        if (!passwordMatch) {
            throw new Error('Password or email incorrect. Try Again');
        }

        const token = sign(
            {},
            process.env.JWT_SECRET || 'fallback_secret',
            {
                subject: String(user.id),
                expiresIn: '1d',
            },
        );

        const userWithoutPassword = {
            id: String(user.id),
            name: user.name,
            email: user.email,
        }

        return {
            user: userWithoutPassword,
            token,
        };
    }
}

export default CreateSessionService