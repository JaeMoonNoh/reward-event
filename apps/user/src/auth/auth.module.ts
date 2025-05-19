import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./entity/user.entity";
import { EncryptService } from "./service/auth.encrypt.service";
import { TimeService } from "./service/time.service";
import { AuthRepository } from "./auth.repository";
import { JwtTokenService } from "./service/jwt-token.service";
import { AuthValidateService } from "./service/auth.validate.service";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    AuthRepository, 
    JwtStrategy, 
    EncryptService, 
    TimeService, 
    JwtTokenService, 
    AuthValidateService
  ],
  exports: [AuthService]
})

export class AuthModule {}