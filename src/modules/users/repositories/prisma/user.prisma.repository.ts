import { PrismaService } from 'src/infra/database/prisma.service';
import {
	UsernameAndEmail,
	UserCreatedDTO,
	CreateUserDTO,
} from '../../dto/user.dto';
import { IUserRepository } from '../user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
	constructor(private prisma: PrismaService) {}

	async findById(id: string): Promise<UserCreatedDTO | null> {
		return this.prisma.user.findUnique({
			where: {
				id,
			},
		});
	}

	async findByUsername(username: string): Promise<UserCreatedDTO | null> {
		return this.prisma.user.findUnique({
			where: {
				username,
			},
		});
	}

	async findByUsernameOrEmail(
		data: UsernameAndEmail,
	): Promise<UserCreatedDTO | null> {
		return this.prisma.user.findFirst({
			where: {
				OR: [{ username: data.username }, { email: data.email }],
			},
		});
	}

	async save(data: CreateUserDTO): Promise<UserCreatedDTO> {
		return this.prisma.user.create({ data });
	}
}
