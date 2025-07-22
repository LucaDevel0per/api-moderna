import { prisma } from '../lib/prisma'


class ListUsersService {
    public async execute() {
        const users = await prisma.user.findMany()
        return users;
    }
}

export default ListUsersService;