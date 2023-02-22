import {
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway, WebSocketServer
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AppService } from './app.service';
import { NotificationDto } from './dto/notification.dto';
import { MessageDto } from './dto/message.dto';


@WebSocketGateway(81, {
	cors: {
		origin: '*',
	},
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Server;

	constructor(private readonly _appService: AppService) {
	}

	@SubscribeMessage('enterChat')
	async handleEnterChat(client: Socket, payload: string): Promise<void> {
		this._appService.addUser(payload);
		this.server.emit('updateChatUsers');
	}

	@SubscribeMessage('leaveChat')
	async handleLeaveChat(client: Socket, payload: string): Promise<void> {
		this._appService.deleteUser(payload);
		this.server.emit('updateChatUsers');
	}

	@SubscribeMessage('sendNotification')
	async handleSendNotification(client: Socket, payload: NotificationDto): Promise<void> {
		this.server.emit('getNotification', payload);
	}

	@SubscribeMessage('sendMessage')
	async handleSendMessage(client: Socket, payload: MessageDto): Promise<void> {
		this._appService.messages.push(payload)
		this.server.emit('getMessage', payload);
	}

	afterInit(server: Server) {
		console.log(server);
		//Выполняем действия
	}

	handleDisconnect(client: Socket) {
		console.log(`Disconnected: ${client.id}`);
		//Выполняем действия
	}

	handleConnection(client: Socket, ...args: any[]) {
		console.log(`Connected ${client.id}`);
		//Выполняем действия
	}
}
