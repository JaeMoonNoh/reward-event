import { User } from "../entity/user.entity";

export type UserWithoutPassword = Omit<User, "password">