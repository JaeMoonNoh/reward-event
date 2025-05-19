import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class TimeService {
    
    private readonly inDay : number;

    constructor(
        private readonly configService: ConfigService,
    ) {
        this.inDay = this.configService.getOrThrow<number>('IN_DAYS')
    }

    now(): Date {
        return new Date();
    }

    formatted(date: string | Date): Date {
        return new Date(date);
    }

    diffInDays(start: Date, end: Date): number {
        const startTime = start.getTime();
        const endTime = end.getTime();
        return (endTime - startTime) / this.inDay;
    }
}