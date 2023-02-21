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

@WebSocketGateway(81, {
	cors: {
		origin: '*',
	},
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Server;

	constructor(private appService: AppService) {
	}

	@SubscribeMessage('sendNotification')
	async handleSendMessage(client: Socket, payload: NotificationDto): Promise<void> {
		// const message = await this.appService.createMessage(payload);
		console.log(123123)
		this.server.emit('getNotification', payload);
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
