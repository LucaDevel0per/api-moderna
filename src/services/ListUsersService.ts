import { prisma } from '../lib/prisma'

// interface IUser {
//     id: number;
//     name: string;
// }

class ListUsersService {
    public async execute() {
        // const users = [
        //     { id: 1, name: 'Diego (from Service)' },
        //     { id: 2, name: 'Dani (from Service)' },
        //     { id: 3, name: 'Jorginho (from Service)' },
        // ];
        const users = await prisma.user.findMany()
        return users;
    }
}

export default ListUsersService;