import { UserLoginDTO } from './../DTO/userLogin.dto';
import { RegisterUserDTO } from './../DTO/registerUser.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  registration(@Body(ValidationPipe) regDTO: RegisterUserDTO) {
    return this.authService.registerUser(regDTO);
  }

  @Post('login')
  signin(@Body(ValidationPipe) userLoginDto: UserLoginDTO) {
    return this.authService.loginUser(userLoginDto);
  }
}
