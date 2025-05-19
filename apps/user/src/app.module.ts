import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import * as Joi from "joi";

@Module({
    imports:[
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: 'apps/user/.env', 
            validationSchema: Joi.object({
                HTTP_PORT: Joi.number().required(),
                DB_URL: Joi.string().required(),
                SALT_ROUND: Joi.number().required(),
                PAGE_NUM: Joi.number().required(),
            })
        }),
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                uri: configService.getOrThrow<string>('DB_URL')
            }),
            inject: [ConfigService]
        }),
        AuthModule
    ]
})

export class AppModule {}