import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    ChatComponent
  ],
	imports: [
		CommonModule,
		MatButtonModule,
		MatInputModule,
		FormsModule,
		HttpClientModule,
		FlexModule
	]
})
export class ChatModule { }
