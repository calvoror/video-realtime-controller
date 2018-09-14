import {Component, OnInit} from '@angular/core';
import {ChatService} from '../chat-service';

@Component({
  selector: 'app-client-controller',
  templateUrl: './client-controller.component.html',
  styleUrls: ['./client-controller.component.css']
})
export class ClientControllerComponent implements OnInit {
  messages: String[] = [];
  connected_clients: String[] = [];

  constructor(private chat: ChatService) {
  }

  ngOnInit() {
    this.chat.sendMsg('ADMIN_CONN');

    this.chat.messages.subscribe(msg => {
      switch (msg.type) {
        case 'client-connection':
          this.connected_clients.push(msg.text);
          break;
        case 'client-disconnection':
          const id = this.connected_clients.indexOf(msg.text);
          this.connected_clients.splice(id, 1);
          break;
        default:
          this.messages.push(msg.text);
          break;
      }
    });
  }

  playVideos() {
    this.sendMessage('PLAY');
  }

  pauseVideos() {
    this.sendMessage('PAUSE');
  }

  rewindVideos() {
    this.sendMessage('REWIND');
  }

  sendMessage(msg: string = 'Client Message') {
    this.chat.sendMsg(msg);
  }
}
