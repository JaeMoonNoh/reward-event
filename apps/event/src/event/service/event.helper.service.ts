import { BadRequestException } from "@nestjs/common";
import { ERROR_MESSAGES } from "apps/common/constant/error-message.constant";
import { Types } from "mongoose";

export class EventHelperService {

    toObjectId(id: string): Types.ObjectId {
        if(!Types.ObjectId.isValid(id)) {
            throw new BadRequestException(ERROR_MESSAGES.INVALID_MONGO_ID);
        }
        return new Types.ObjectId(id);
    }

    
    buildQuery(userId: string, afterId?: string): any {
        const query: any = { userId };
        if(afterId) {
            query._id = { $gt: this.toObjectId(afterId) }
        }
        return query;
    }

    buildAllQuery(afterId?: string) {
        return afterId
            ? { _id: { $gt: this.toObjectId(afterId) } }
            : {};
    }

    calculateNextCursor(claims: any[]): Types.ObjectId | null {
        if(claims.length === 0) {
            return null;
        }
        return claims[claims.length - 1]._id;
    }

    getNextCursor(data: any[]): Types.ObjectId | null {
        return data.length > 0 ? data[data.length - 1]._id : null;
    }
}