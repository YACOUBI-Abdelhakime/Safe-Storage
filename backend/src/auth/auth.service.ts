import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dtos/auth.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(login: AuthDto): Promise<{ token: string }> {
    let user = await this.userModel.findOne({
      email: login.email.toLowerCase(),
    });
    let match: boolean = false;

    if (user) {
      match = await bcrypt.compare(login.password, user.password);
    }

    if (!match) {
      throw new UnauthorizedException('Email or password not correct');
    }
    // Generate JWT token for registered user
    let token: string = this.jwtService.sign({
      user: {
        _id: user._id,
        email: user.email,
      },
    });

    return { token };
  }

  async register(user: AuthDto): Promise<{ token: string }> {
    const hashedPassword: string = await bcrypt.hash(user.password, 10);
    const email: string = user.email.trim().toLowerCase();
    const newUser: User = {
      email,
      password: hashedPassword,
    };

    let createdUser;
    try {
      createdUser = await this.userModel.create(newUser);
    } catch (error) {
      if (error.code === 11000) {
        // Duplicated email
        throw new BadRequestException(
          'Email is already used. Please choose another one or login',
        );
      }
      throw new BadRequestException(error.message);
    }

    // Generate JWT token for registered user
    let token: string = this.jwtService.sign({
      user: {
        _id: createdUser._id,
        email: createdUser.email,
      },
    });

    return { token };
  }
}
