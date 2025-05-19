import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { AuthLoginDto } from 'apps/common/dto/auth/login.dto';
import { SignUpDto } from 'apps/common/dto/auth/sign-up.dto';
import { ModifyRoleDto } from 'apps/common/dto/auth/modify-role.dto';
import { UserIdParamDto } from 'apps/common/dto/auth/user-id.param.dto';
import { Role } from 'apps/common/constant/role.constant';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() userData: AuthLoginDto) {
    return this.authService.login(userData);
  }

  @Post('sign-up')
  signUp(@Body() userData: SignUpDto) {
    return this.authService.signUp(userData);
  }

  @Patch('/users/:userId/role')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  modifyRole(
    @Body() modifyData: ModifyRoleDto,
    @Param() params: UserIdParamDto
  ) {
    return this.authService.modifyRole({role : modifyData.role, userId : params.userId});
  }

}
