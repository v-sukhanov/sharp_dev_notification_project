import { Injectable } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';


@Injectable()
export class AppService {
	private _chatUsers: string[] = [];
	messages: MessageDto[] = [];

	getChatUsers(): string[] {
		return this._chatUsers;
	}

	addUser(user: string) {
		this._chatUsers.push(user)
	}

	deleteUser(user: string) {
		this._chatUsers = this._chatUsers.filter(u => u !==user);
	}

	sendMessage(message: MessageDto) {
		this.messages.push(message);
	}

	getMessages() {
		return this.messages;
	}
}
