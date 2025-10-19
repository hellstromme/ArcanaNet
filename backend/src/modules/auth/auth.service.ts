import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../common/dto/create-user.dto';

@Injectable()
export class AuthService {
  register(createUserDto: CreateUserDto) {
    return {
      message: 'User registered',
      user: createUserDto,
    };
  }

  login(email: string) {
    return {
      message: 'Login successful',
      email,
      token: 'mock-jwt-token',
    };
  }
}
