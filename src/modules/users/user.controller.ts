import {
	Body,
	Controller,
	Get,
	Post,
	Request,
	UseGuards,
} from '@nestjs/common';
import { CreateUsersUseCase } from './useCases/create-user.usecase';
import { AuthGuard } from 'src/infra/providers/auth-guard.provider';
import { ProfileUserUseCase } from './useCases/profile-user.usecase';
import {
	CreateUserResponseSchemaDTO,
	CreateUserSchemaDTO,
} from './schemas/create-user.schema';

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
}
