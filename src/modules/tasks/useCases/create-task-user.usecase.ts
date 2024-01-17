import { Injectable } from '@nestjs/common';
import { ITaskUserRepository } from '../repositories/task-user.repository';

@Injectable()
export class CreateTaskUserUseCase {
	constructor(private taskUserRepository: ITaskUserRepository) {}
	async execute(data: any) {
		return this.taskUserRepository.save(data);
	}
}
