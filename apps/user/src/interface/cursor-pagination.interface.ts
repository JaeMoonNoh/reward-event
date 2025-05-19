import { Types } from "mongoose";
import { User } from "../auth/entity/user.entity";

export interface CursorPagination {
    data: User[],
    nextCursor: Types.ObjectId | null
}