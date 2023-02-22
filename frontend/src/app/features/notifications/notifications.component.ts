import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationsService } from '../../services/notifications.service';

@Component({
	selector: 'app-notifications',
	templateUrl: './notifications.component.html',
	styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
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
