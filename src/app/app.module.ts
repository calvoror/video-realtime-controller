import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {ChatService} from './chat-service';
import {WebsocketService} from './web-socket-service';
import {ClientComponent} from './client/client.component';
import {ClientControllerComponent} from './client-controller/client-controller.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ClientComponent
  },
  {
    path: 'admin',
    component: ClientControllerComponent,
    data: {title: 'One controller to control them all'}
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ClientControllerComponent,
    ClientComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    )
  ],
  providers: [ChatService, WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
