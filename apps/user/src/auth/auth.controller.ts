import { Controller } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { MessagePattern } from "@nestjs/microservices";
import { AUTH_COMMANDS } from "apps/common/constant/auth-cmd.constant";
import { AuthLoginDto } from "apps/common/dto/auth/login.dto";
import { SignUpDto } from "apps/common/dto/auth/sign-up.dto";
import { AuthModifyPayload } from "apps/common/interface/auth-modify.interface";

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}
  
  @MessagePattern({ cmd: AUTH_COMMANDS.AUTH_LOGIN })
  async login(userData: AuthLoginDto) {
    return await this.authService.loginProcess(userData);
  }

  @MessagePattern({ cmd: AUTH_COMMANDS.AUTH_SIGN_UP })
  async signUp(userData: SignUpDto) {
    return this.authService.signUp(userData);
  }

  @MessagePattern({ cmd: AUTH_COMMANDS.AUTH_MODIFY_ROLE })
  async modifyRole(modifyPayload: AuthModifyPayload) {
    return this.authService.modifyRole(modifyPayload);
  }
}