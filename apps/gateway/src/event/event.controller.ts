import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { CreateEventDto } from 'apps/common/dto/event/create-event.dto';
import { RewardDto } from 'apps/common/dto/event/reward.dto';
import { StatusUpdateDto } from 'apps/common/dto/event/status-update.dto';
import { PaginationQueryDto } from 'apps/common/dto/event/pagination-query.dto';
import { User } from 'apps/common/decorator/user.decorator';
import { UserType } from 'apps/common/interface/jwt-payload.interface';
import { EventIdDto } from 'apps/common/dto/event/event-id.dto';
import { Role } from 'apps/common/constant/role.constant';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get('/admin/rewards/claims')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OPERATOR, Role.AUDITOR)
  readAllReward(@Query() query: PaginationQueryDto) {
    console.log(query);
    return this.eventService.readAllReward(query.afterId);
  }

  @Get('/:eventId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER, Role.ADMIN, Role.OPERATOR)
  readEvent(@Param() params: EventIdDto) {
    return this.eventService.readEvent(params.eventId);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER, Role.ADMIN, Role.OPERATOR)
  readAllEvent() {
    return this.eventService.readAllEvent();
  }

  @Get('/users/me/claims')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  readReward(@User() user: UserType, @Query() query: PaginationQueryDto) {
    return this.eventService.readReward(user.userId, query.afterId);
  }

  @Get('/:eventId/rewards')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER, Role.ADMIN, Role.OPERATOR)
  readRewardEvent(@Param() params: EventIdDto) {
    return this.eventService.readRewardEvent(params.eventId);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OPERATOR)
  createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventService.createEvent(createEventDto);
  }

  @Patch('/:eventId/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OPERATOR)
  updateStatus(@Body() statusUpdate: StatusUpdateDto, @Param() params: EventIdDto) {
    return this.eventService.updateStatus(statusUpdate.status, params.eventId);
  }

  @Post('/:eventId/add/rewards')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OPERATOR)
  addReward(@Body() rewards: RewardDto[], @Param() params: EventIdDto) {
    return this.eventService.addReward(rewards, params.eventId);
  }

  @Post('/:eventId/claim')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  rewardEvent(@User() user: UserType, @Param() params: EventIdDto) {
    return this.eventService.rewardEvent(user, params.eventId);
  }
}
