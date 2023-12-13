import { User } from "../dto";
import { UserRepository } from "./repository";

class Service {
    private readonly repository = UserRepository

    async findByUsername(username: string): Promise<User> {
        const entity = await this.repository.findOne(username, "username")
        return entity
    }
}

const UserService = new Service()

export { UserService }