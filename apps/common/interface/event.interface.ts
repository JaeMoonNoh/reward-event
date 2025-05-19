import { CreateEventDto } from "../dto/event/create-event.dto";
import { RewardDto } from "../dto/event/reward.dto";
import { UserType } from "./jwt-payload.interface";

export interface EventIdPayload {
    eventId: string;    
}

export interface AddRewardPayload {
    rewards: RewardDto[];
    eventId: string;
}

export interface UpdateStatusPayload {
    status: string;
    eventId: string;
}

export interface CreateEventPayload {
    eventData: CreateEventDto;
}

export interface ReadRewardPayload {
    userId: string;
    afterId?: string;
}

export interface ReadAllRewardPayload {
    afterId?: string;
}

export interface RewardEventPayload {
    user: UserType;
    eventId: string;
}
