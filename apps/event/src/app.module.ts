import { Module } from "@nestjs/common";
import { EventModule } from "./event/event.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as Joi from "joi";
import { BullModule } from "@nestjs/bull";

@Module({
    imports:[
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: 'apps/event/.env',
            validationSchema: Joi.object({
                DB_URL: Joi.string().required(),
                IN_DAYS: Joi.string().required(),
                PAGE_NUM: Joi.string().required(),
            })
        }),
        MongooseModule.forRootAsync({
            useFactory: (ConfigService: ConfigService) => ({
                uri: ConfigService.getOrThrow<string>('DB_URL')
            }),
            inject: [ConfigService]
        }),
        BullModule.forRoot({
            redis: {
                host: 'redis',
                port: 6379,
            }
        }),
        EventModule,
    ]
})

export class AppModule {}