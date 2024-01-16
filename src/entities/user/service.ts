import { IUser } from "../dto";
import { UserRepository } from "./repository";

class Service {
    private readonly repository = UserRepository

    async findByUsername(username: string): Promise<IUser | null> {
        const entity = await this.repository.findOne(username)
        return entity
    }

    create(data: Partial<IUser>): Promise<IUser | unknown> {
        return this.repository.create(data as IUser).then((data) => data).catch((error) => error)
    }
}

const UserService = new Service()

export { UserService }