import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDTO } from '../dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from 'src/modules/users/repositories/user.repository';
import { compare } from 'bcrypt';

@Injectable()
export class SignInUseCase {
  constructor(
    private jwtService: JwtService,
    private userRepository: IUserRepository,
  ) {}

  async execute(data: SignInDTO) {
    // validate if username exists in the database
    const user = await this.userRepository.findByUsername(data.username);

    // NO exists - return error
    if (!user) {
      throw new UnauthorizedException();
    }

    // YES - validate password
    const isEqualPassword = await compare(data.password, user.password);

    // NO - return error
    if (!isEqualPassword) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      username: user.username,
    };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
    };
  }
}
