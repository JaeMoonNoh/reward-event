import { Module } from "@nestjs/common";
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { EventModule } from './event/event.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'secretKey',
            signOptions: { expiresIn: '1h'}
        }),
        AuthModule,
        EventModule
    ],
    providers:[
        JwtStrategy,
    ]
})
export class AppModule {}