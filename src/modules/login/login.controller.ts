import { Body, Controller, Post } from '@nestjs/common';
import { SignInDTO } from './dto/sign-in.dto';
import { SignInUseCase } from './useCases/sign-in.usecase';

@Controller()
export class LoginController {
  constructor(private signInUseCase: SignInUseCase) {}

  @Post('signIn')
  async singIn(@Body() singInDTO: SignInDTO) {
    const token = await this.signInUseCase.execute(singInDTO);
    return token;
  }
}
