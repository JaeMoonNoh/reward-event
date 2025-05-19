import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type RewardDocument = Reward & Document

@Schema({ timestamps: true })
export class Reward {
    @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
    eventId: Types.ObjectId;

    @Prop({ required: true })
    type: string;

    @Prop({ required: true })
    value: number;

    @Prop({ type: Object })
    details: Record<string, any>;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);