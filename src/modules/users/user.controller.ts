import {
	Body,
	Controller,
	Get,
	Post,
	Put,
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
import { UploadAvatarUseCase } from './useCases/upload-avatar.useCase';

@Controller('/users')
export class UserController {
	constructor(
		private readonly createUserUseCase: CreateUsersUseCase,
		private readonly profileUseCase: ProfileUserUseCase,
		private readonly avatarUserUseCase: UploadAvatarUseCase,
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

	@Put('/avatar')
	@UseInterceptors(FileInterceptor('file'))
	@UseGuards(AuthGuard)
	async uploadAvatar(@Request() req, @UploadedFile() file: FileDTO) {
		// return await this.profileUseCase.execute({
		// 	idUser: req.user.sub,
		// 	file,
		// });
		console.log(req, file);

		// Implementando supabase no usecase
		// 03:09
		0;
	}
}
