import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';
import { ChatModule } from './features/chat/chat.module';
import { NotificationsModule } from './features/notifications/notifications.module';

const config: SocketIoConfig = { url: 'http://localhost:81', options: {} };


@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatInputModule,
		MatButtonModule,
		MatSnackBarModule,
		SocketIoModule.forRoot(config),
		FormsModule,
		ChatModule,
		NotificationsModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
