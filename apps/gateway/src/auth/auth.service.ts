import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AUTH_COMMANDS } from 'apps/common/constant/auth-cmd.constant';
import { AuthLoginDto } from 'apps/common/dto/auth/login.dto';
import { SignUpDto } from 'apps/common/dto/auth/sign-up.dto';
import { AuthModifyPayload } from 'apps/common/interface/auth-modify.interface';

@Injectable()
export class AuthService implements OnModuleInit {
    private client: ClientProxy;

    onModuleInit() {
        this.client = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: { host: 'user', port: 3000 },
        });
    }
    
    login(userData: AuthLoginDto) {
        return this.client.send(
                        { cmd: AUTH_COMMANDS.AUTH_LOGIN }, 
                        userData
                    );
    }

    signUp(userData: SignUpDto) {
        return this.client.send(
                        { cmd: AUTH_COMMANDS.AUTH_SIGN_UP }, 
                        userData    
                    );
    }

    modifyRole(modifyPayload: AuthModifyPayload) {
        return this.client.send(
                        { cmd: AUTH_COMMANDS.AUTH_MODIFY_ROLE }, 
                        modifyPayload
                    );
    }

}
