import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserService } from 'src/user/use-case/create-user.service';

@Controller('users')
export class UserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  createArticle(@Body() data: UserCreateDto) {
    return this.createUserService.createUser(data);
  }
}
