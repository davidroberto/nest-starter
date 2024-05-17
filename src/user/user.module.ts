import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/user/controller/user.controller';
import { CreateUserService } from 'src/user/use-case/create-user.service';
import { PasswordHasherService } from 'src/user/utils/password-hasher.service';
import { PasswordHasherServiceInterface } from 'src/user/utils/password-hasher.service.interface';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    {
      provide: CreateUserService,
      useFactory: (passwordHasherService: PasswordHasherServiceInterface) => {
        return new CreateUserService(passwordHasherService);
      },
      inject: [PasswordHasherService],
    },
  ],
})
export class UserModule {}
