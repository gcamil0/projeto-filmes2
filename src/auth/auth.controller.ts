import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('registro')
  registro(@Body() body) {
    return this.auth.registrar(body.email, body.senha);
  }

  @Post('login')
  login(@Body() body) {
    return this.auth.login(body.email, body.senha);
  }
}