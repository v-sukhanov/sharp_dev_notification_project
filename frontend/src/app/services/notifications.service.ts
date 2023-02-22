import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs';
import { INotification } from '../interfaces/notification.interface';


@Injectable({
	providedIn: 'root'
})
export class NotificationsService {
	constructor(private _socket: Socket) {}

	sendNotification(msg: INotification) {
		this._socket.emit('sendNotification', msg);
	}
	getNotification() {
		return this._socket.fromEvent<INotification>('getNotification').pipe(map((data) => data));
	}
}