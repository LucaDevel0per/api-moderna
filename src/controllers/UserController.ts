import { Request, Response } from "express";
import ListUsersService from "../services/ListUsersService";
import CreateUserService from "../services/CreateUserService";

class UserController {
    public async list(request: Request, response: Response):Promise <Response> {
        const listUsers = new ListUsersService;
        const users = await listUsers.execute();
        
        return response.json(users)
    }

    public async create(request: Request, response: Response): Promise <Response> {

        const createUser = new CreateUserService
        const {name, email, password} = request.body
        const user = await createUser.execute({ name, email, password })

        return response.status(201).json(user);
    }
}

export default new UserController();