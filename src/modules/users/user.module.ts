import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUsersUseCase } from './useCases/create-user.usecase';
import { PrismaService } from 'src/infra/database/prisma.service';
import { UserPrismaRepository } from './repositories/prisma/user.prisma.repository';
import { IUserRepository } from './repositories/user.repository';
import { ProfileUserUseCase } from './useCases/profile-user.usecase';

@Module({
	imports: [],
	controllers: [UserController],
	providers: [
		CreateUsersUseCase,
		ProfileUserUseCase,
		PrismaService,
		{
			provide: IUserRepository,
			useClass: UserPrismaRepository,
		},
	],
})
export class UserModule {}
