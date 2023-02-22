import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IMessage } from '../../interfaces/message.interface';

export const API = 'http://localhost:3000';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnDestroy, OnInit{
	name = '';
	chatEntered = false;
	message = '';
	users = []
	messages: IMessage[] = []
	private _onDestroy$ = new Subject<void>();

	constructor(
		private _chatService: ChatService,
		private _httpClient: HttpClient
	) {
	}

	ngOnInit() {
		this._httpClient.get(API +'/chat/getMessages')
			.subscribe(messages => {
				// @ts-ignore
				this.messages = messages;
			})
	}

	goToChat() {
		this.chatEntered = true;
		this._subscribeChatEvents()
		this._chatService.enterChat(this.name);
	}

	ngOnDestroy() {
		this._onDestroy$.next();
		this._onDestroy$.complete();
		this._chatService.leaveChat(this.name);

	}

	private _subscribeChatEvents() {
		this._chatService.updateUsers()
			.pipe(
				switchMap(() => {
					return this._httpClient.get(API + '/chat/users')
				}),
				takeUntil(this._onDestroy$),
			)
			.subscribe((users) => {
				// @ts-ignore
				this.users = users
			})
		this._chatService.getMessage()
			.pipe(
				takeUntil(this._onDestroy$)
			)
			.subscribe(message => {
				// @ts-ignore
				this.messages.push(message)
			})
	}

	sendMessage() {
		this._chatService.sendMessage({name: this.name, message: this.message})
		this.message = '';
	}
}
