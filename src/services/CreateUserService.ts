import { prisma } from "../lib/prisma";

interface IRequest {
    name: string
    email: string
}

class CreateUserService {
    public async execute({ name, email}: IRequest) {
        const userExists = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (userExists) {
            throw new Error("Este email já está em uso.")
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
            },
        });

        return user;
    }
}

export default CreateUserService;