import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordHasherServiceInterface } from 'src/user/utils/password-hasher.service.interface';

Injectable();
export class CreateUserService {
  constructor(
    @InjectRepository(User)
    private readonly passwordHasherService1: PasswordHasherServiceInterface,
    private readonly passwordHasherService2: PasswordHasherServiceInterface,
  ) {}

  async createUser(data: UserCreateDto) {
    const userToPersist = {
      ...data,
      password: await this.passwordHasherService.hashPassword(data.password),
    };

    try {
      // return this.userRepository.save(userToPersist);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating user');
    }
  }
}
