import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { NotificationsService } from './notifications.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
	msg = '';
	name = '';
	private _onDestroy$ = new Subject<void>();

	constructor(private _snackBar: MatSnackBar, private _notificationsService: NotificationsService) {
	}

	ngOnInit() {
		this._notificationsService.getNotification()
			.pipe(
				takeUntil(this._onDestroy$)
			)
			.subscribe((notification) => {
				this._snackBar.open(`You get notification: ${notification.message} from: ${notification.name}`, undefined, {
					duration: 4000
				});
			})
	}

	ngOnDestroy() {
		this._onDestroy$.next();
	}

	sendNotification() {
		this._notificationsService.sendNotification({
			message: this.msg,
			name: this.name
		})
		this.msg = '';
	}


}

