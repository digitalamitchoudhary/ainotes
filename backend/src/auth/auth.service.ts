import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../users/schema/user.schema';
import { RegisterDto, LoginDto, AuthResponseDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    console.log('Register called with:', registerDto);
    const { email, password, firstName, lastName } = registerDto;

    console.log('Checking for existing user...');
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      console.log('User already exists');
      throw new BadRequestException('User with this email already exists');
    }

    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('Creating new user...');
    const newUser = await this.userModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    console.log('User created:', newUser);

    console.log('Signing JWT...');
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    const access_token = this.jwtService.sign({
      sub: newUser._id,
      email: newUser.email,
    });

    console.log('Returning response');
    return {
      access_token,
      user: {
        id: newUser._id.toString(),
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const access_token = this.jwtService.sign({
      sub: user._id,
      email: user.email,
    });

    return {
      access_token,
      user: {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }
}

