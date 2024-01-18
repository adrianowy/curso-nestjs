import {
	Body,
	Controller,
	Get,
	Post,
	Request,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { CreateUsersUseCase } from './useCases/create-user.usecase';
import { AuthGuard } from 'src/infra/providers/auth-guard.provider';
import { ProfileUserUseCase } from './useCases/profile-user.usecase';
import {
	CreateUserResponseSchemaDTO,
	CreateUserSchemaDTO,
} from './schemas/create-user.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDTO } from './dto/user.dto';

@Controller('/users')
export class UserController {
	constructor(
		private readonly createUserUseCase: CreateUsersUseCase,
		private readonly profileUseCase: ProfileUserUseCase,
	) {}

	@Post()
	// @UsePipes(new CreateUserValidationPipe())
	async create(@Body() data: CreateUserSchemaDTO) {
		const user = await this.createUserUseCase.execute(data);
		return CreateUserResponseSchemaDTO.parse(user);
	}

	@Get('/profile')
	@UseGuards(AuthGuard)
	async profile(@Request() req: any) {
		return this.profileUseCase.execute(req.user.sub);
	}

	@Post('/avatar')
	@UseInterceptors(FileInterceptor('file'))
	@UseGuards(AuthGuard)
	async uploadAvatar(@Request() req, @UploadedFile() file: FileDTO) {
		console.log(file);
	}
}
