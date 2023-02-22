import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './features/chat/chat.component';
import { NotificationsComponent } from './features/notifications/notifications.component';

const routes: Routes = [
	{
		path: 'chat',
		component: ChatComponent
	},
	{
		path: 'notifications',
		component: NotificationsComponent
	}, {
		path: '**',
		redirectTo: 'chat'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
