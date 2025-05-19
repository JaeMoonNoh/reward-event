import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document

export enum UserRoles {
    USER = 'user',
    OPERATOR = 'operator',
    AUDITOR = 'auditor',
    ADMIN = 'admin'
}

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, unique: true})
    userId: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    password: string;

    @Prop({
        enum: UserRoles,
        default: UserRoles.USER,
    })
    role: UserRoles;

    @Prop()
    firstLoginAt?: Date;

    @Prop()
    lastLoginAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);