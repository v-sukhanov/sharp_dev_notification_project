import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MessageDto } from './dto/message.dto';

@Controller()
export class AppController {

	constructor(private readonly _appService: AppService) {
	}

	@Get('chat/users')
	getHello(): string[] {
		return this._appService.getChatUsers();
	}

	@Post('chat/sendMessage')
	sendMessage(@Body() message: MessageDto) {
		return this._appService.sendMessage(message);
	}

	@Get('chat/getMessages')
	getMessages(): MessageDto[] {
		return this._appService.getMessages();
	}
}
