import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { EVENT_COMMANDS } from 'apps/common/constant/event-cmd.constant';
import { CreateEventDto } from 'apps/common/dto/event/create-event.dto';
import { RewardDto } from 'apps/common/dto/event/reward.dto';
import { UserType } from 'apps/common/interface/jwt-payload.interface';

@Injectable()
export class EventService implements OnModuleInit{

    private client: ClientProxy

    onModuleInit() {
        this.client = ClientProxyFactory.create({
            transport: Transport.REDIS,
            options: { 
                host: 'redis', 
                port: 6379 
            },
        })
    }

    readEvent(eventId: string) {
        return this.client.send(
                        { cmd: EVENT_COMMANDS.READ }, 
                        { eventId }
                    );
    }

    readAllEvent() {
        return this.client.send(
                        { cmd: EVENT_COMMANDS.READ_ALL }, 
                        {}
                    );
    }

    createEvent(createEventDto: CreateEventDto) {
        return this.client.send(
                        { cmd: EVENT_COMMANDS.CREATE }, 
                        { eventData : createEventDto }
                    );
    }
    
    updateStatus(status: string, eventId: string) {
        return this.client.send(
                        { cmd: EVENT_COMMANDS.UPDATE_STATUS }, 
                        { status, eventId }
                    );
    }

    readReward(userId: string, afterId?: string | undefined) {
        return this.client.send(
                        { cmd: EVENT_COMMANDS.READ_REWARD }, 
                        { userId, afterId }
                    );
    }

    readAllReward(afterId?: string | undefined) {
        return this.client.send(
                        { cmd: EVENT_COMMANDS.READ_ALL_REWARD }, 
                        { afterId }
                    );
    }

    readRewardEvent(eventId: string) {
        return this.client.send(
                        { cmd: EVENT_COMMANDS.READ_REWARD_EVENT }, 
                        { eventId }
                    );
    }

    addReward(rewards: RewardDto[], eventId: string) {
        return this.client.send(
                        { cmd: EVENT_COMMANDS.ADD_REWARD }, 
                        { rewards: rewards, eventId }
                    );
    }

    rewardEvent(user: UserType, eventId: string) {
        return this.client.send(
                        { cmd: EVENT_COMMANDS.REWARD_EVENT }, 
                        { user, eventId }
                    );
    }

}
