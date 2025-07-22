import { Request, Response } from "express";
import ListUsersService from "../services/ListUsersService";
// import { prisma } from "../lib/prisma";
import CreateUserService from "../services/CreateUserService";

class UserController {
    public async list(request: Request, response: Response):Promise <Response> {
        const listUsers = new ListUsersService;

        const users = await listUsers.execute();
        
        return response.json(users)
    }

    public async create(request: Request, response: Response): Promise <Response> {

        const createUser = new CreateUserService
        const {name, email} = request.body
        const user = await createUser.execute({ name, email })

        return response.json(user)
        // const { name, email } = request.body;

        // try {
        //     const userExists = await prisma.user.findUnique({ 
        //         where: {email}
        //     });
        //     if (userExists) {
        //         return response.status(400).json({ error: 'e-mail already exists on database.'})
        //     }

        //     const user = await prisma.user.create({
        //         data: {
        //             name,
        //             email,
        //         },
        //     });
        //     return response.json(user)
        // } catch (err) {
        //     return response.status(500).json({ error: 'Server Error.'})
        // }
    }
}

export default new UserController();