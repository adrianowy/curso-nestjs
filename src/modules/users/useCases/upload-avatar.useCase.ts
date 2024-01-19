import { Injectable } from '@nestjs/common';
import { AvatarDTO } from '../dto/user.dto';
import { IUserRepository } from '../repositories/user.repository';
import { IStorage } from 'src/infra/providers/storage/storage';

@Injectable()
export class UploadAvatarUseCase {
	constructor(
		private storage: IStorage,
		private userRepository: IUserRepository,
	) {}
	async execute(data: AvatarDTO) {
		const file = await this.storage.upload(data.file, 'avatar');
		console.log(file);
		return file;
	}
}
