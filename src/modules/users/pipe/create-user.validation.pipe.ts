import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateUserDTO } from '../dto/user.dto';

@Injectable()
export class CreateUserValidationPipe implements PipeTransform {
  transform({ name, email, username, password }: CreateUserDTO) {
    if (!name || !email || !username || !password) {
      throw new HttpException(
        '[name, email, username, password] are required.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    // Object.keys(value).forEach((key) => {
    //   console.log(key, value[key]);
    //   if (!value[key]) {
    //     throw new HttpException(
    //       `[${key}] is required.`,
    //       HttpStatus.UNPROCESSABLE_ENTITY,
    //     );
    //   }
    // });

    return { name, email, username, password };
  }
}
