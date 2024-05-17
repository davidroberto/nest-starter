import { PasswordHasherServiceInterface } from 'src/user/utils/password-hasher.service.interface';

export class SodiumPasswordHasherService
  implements PasswordHasherServiceInterface
{
  hashPassword(password: string): Promise<string> {
    return sodium.hashPassword(password);
  }
}
