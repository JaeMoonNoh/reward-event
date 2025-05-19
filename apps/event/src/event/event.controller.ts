import { Controller } from '@nestjs/common';
import { EventService } from './event.service';
import { MessagePattern } from '@nestjs/microservices';
import { EVENT_COMMANDS } from 'apps/common/constant/event-cmd.constant';
import { AddRewardPayload, CreateEventPayload, EventIdPayload, ReadAllRewardPayload, ReadRewardPayload, RewardEventPayload, UpdateStatusPayload } from 'apps/common/interface/event.interface';
import { ClaimService } from './claim.service';
import { RewardService } from './reward.service';

@Controller()
export class EventController {
  constructor(
  private readonly eventService: EventService,
  private readonly claimService: ClaimService,
  private readonly rewardService: RewardService,
  ) {}

  @MessagePattern({ cmd: EVENT_COMMANDS.READ })
  async readEvent({ eventId } : EventIdPayload) {
    return this.eventService.readEvent(eventId);
  }

  @MessagePattern({ cmd: EVENT_COMMANDS.READ_ALL })
  async readAllEvent() {
    return this.eventService.readAllEvent();
  }

  @MessagePattern({ cmd: EVENT_COMMANDS.CREATE })
  async createEvent( { eventData }: CreateEventPayload ) {
    return this.eventService.createEvent(eventData);
  }

  @MessagePattern({ cmd: EVENT_COMMANDS.UPDATE_STATUS })
  async updateStatus( updateStatusDto : UpdateStatusPayload) {
    return this.eventService.updateStatus(updateStatusDto);
  }

  @MessagePattern({ cmd: EVENT_COMMANDS.READ_REWARD })
  async readReward({ userId, afterId }: ReadRewardPayload) {
    return this.claimService.readReward(userId, afterId);
  }

  @MessagePattern({ cmd: EVENT_COMMANDS.READ_ALL_REWARD })
  async readAllReward({ afterId } : ReadAllRewardPayload) {
    console.log("after id : ", afterId);
    return this.claimService.readAllReward(afterId);
  }

  @MessagePattern({ cmd: EVENT_COMMANDS.READ_REWARD_EVENT })
  async readRewardEvent({ eventId } : EventIdPayload) {
    return this.rewardService.readRewardEvent(eventId);
  }

  @MessagePattern({ cmd : EVENT_COMMANDS.ADD_REWARD })
  async addReward(addRewardDto : AddRewardPayload) {
    return this.rewardService.addReward(addRewardDto.rewards, addRewardDto.eventId);
  }

  @MessagePattern({ cmd: EVENT_COMMANDS.REWARD_EVENT })
  async rewardEvent({user, eventId} : RewardEventPayload) {
    return this.eventService.rewardEvent(user, eventId);
  }
}
