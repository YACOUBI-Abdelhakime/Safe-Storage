import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() body: AuthDto): Promise<{ token: string }> {
    return await this.authService.login(body);
  }

  @Post('/register')
  async register(@Body() user: AuthDto): Promise<{ token: string }> {
    return await this.authService.register(user);
  }
}
