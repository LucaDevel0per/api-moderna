import { prisma } from "../lib/prisma";
import { hash } from 'bcryptjs'

interface IRequest {
    name: string
    email: string
    password: string
}

class CreateUserService {
    public async execute({ name, email, password }: IRequest) {
        const userExists = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (userExists) {
            throw new Error("Este email já está em uso.")
        }

        const hashedPassword = await hash(password, 8)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true
            }
        });

        return user;
    }
}

export default CreateUserService;