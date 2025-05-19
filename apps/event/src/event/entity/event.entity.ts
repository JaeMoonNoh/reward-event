import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type EventDocument = Event & Document

export enum Status {
    INACTIVE = 'inactive',
    ACTIVE = 'active'
}

@Schema({ timestamps: true })
export class Event {
    @Prop({ required: true })
    title: string;

    @Prop({ type: Object })
    conditions: Record<string, any>;

    @Prop({
        enum: Status,
        default: Status.INACTIVE,
    })
    status: string;

    @Prop({ required: true })
    startDate: Date;

    @Prop({ required: true })
    endDate: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);