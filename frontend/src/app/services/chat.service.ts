import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { INotification } from '../interfaces/notification.interface';
import { map } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ChatService {
	constructor(private _socket: Socket) {
	}

	enterChat(name: string) {
		this._socket.emit('enterChat', name);
	}

	leaveChat(name: string) {
		this._socket.emit('leaveChat', name);
	}

	updateUsers() {
		return this._socket.fromEvent<INotification>('updateChatUsers');
	}

	getMessage() {
		return this._socket.fromEvent<INotification>('getMessage');
	}

	sendMessage(msg: INotification) {
		this._socket.emit('sendMessage', msg);
	}

	getMessages() {
		return this._socket.fromEvent<INotification>('getMessage').pipe(map((data) => data));
	}
}