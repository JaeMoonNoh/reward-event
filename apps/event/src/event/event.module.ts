import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './entity/event.entity';
import { Reward, RewardSchema } from './entity/reward.entity';
import { Claim, ClaimSchema } from './entity/claim.entity';
import { ClaimService } from './service/claim.service';
import { EventHelperService } from './service/event.helper.service';
import { EventValidationService } from './service/event.validation.service';
import { RewardService } from './service/reward.service';
import { StrategyFactory } from './strategy/strategy-factory';
import { SignupDaysStrategy } from './strategy/signup-days.strategy';
import { AuthModule } from 'apps/user/src/auth/auth.module';
import { TimeService } from './service/time.service';

@Module({
  imports: [
      AuthModule,
      MongooseModule.forFeature([
        {
          name: Event.name,
          schema: EventSchema
        },
        {
          name: Reward.name,
          schema: RewardSchema
        },
        {
          name: Claim.name,
          schema: ClaimSchema
        }
    ])
  ],
  controllers: [EventController],
  providers: [
    EventService, 
    ClaimService, 
    EventHelperService, 
    EventValidationService, 
    RewardService,
    StrategyFactory,
    SignupDaysStrategy,
    TimeService
  ],
})
export class EventModule {}
