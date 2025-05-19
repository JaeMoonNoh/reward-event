import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type ClaimDocument = Claim & Document

export enum Status {
    SUCCESS = 'success',
    FAIL = 'fail'
}

@Schema({ timestamps: true })
export class Claim {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
    eventId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Reward', required: true })
    rewardId: Types.ObjectId;

    @Prop({ enum: ['success', 'fail'], required: true })
    status: string;

    @Prop()
    reason: string;
}

export const ClaimSchema = SchemaFactory.createForClass(Claim);