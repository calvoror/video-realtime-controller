import {Injectable} from '@angular/core';
import {WebsocketService} from './web-socket-service';
import {Subject} from 'rxjs';

@Injectable()
export class ChatService {

  messages: Subject<any>;

  // Our constructor calls our wsService connect method
  constructor(private wsService: WebsocketService) {
    this.messages = <Subject<any>>wsService.connect();
    this.messages.lift((response: any): any => {
        return response;
      });
  }

  // Our simplified interface for sending
  // messages back to our socket.io server
  sendMsg(msg) {
    this.messages.next({type: 'new-message', text: msg});
  }

  send(messageType: string, messageText: string) {
    this.messages.next({type: messageType, text: messageText});
  }

}
