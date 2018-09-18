import {Component, OnInit} from '@angular/core';
import {ChatService} from '../chat-service';
import {Utils} from '../utils';

@Component({
  selector: 'app-client-controller',
  templateUrl: './client-controller.component.html',
  styleUrls: ['./client-controller.component.css']
})
export class ClientControllerComponent implements OnInit {
  utils = Utils;
  messages: string[] = [];
  // Associative table with client_id as key and video name as value
  connected_clients: {[client_id: string]: string} = {};

  constructor(private chat: ChatService) {
  }

  ngOnInit() {
    this.chat.messages.subscribe(msg => {
      switch (msg.type) {
        case 'identification':
          this.connected_clients = {};
          this.chat.send('ADMIN_CONN', 'ADMIN_CONN');
          break;
        case 'client-connection':
          this.connected_clients[msg.text] = '';
          break;
        case 'client-disconnection':
          delete this.connected_clients[msg.text];
          break;
        case 'client-video-selected':
          this.connected_clients[msg.client] = msg.video;
          break;
        default:
          this.messages.push(msg.text);
          break;
      }
    });
  }

  playVideos() {
    this.sendMessage(Utils.MESSAGE_VALUE_PLAY);
  }

  pauseVideos() {
    this.sendMessage(Utils.MESSAGE_VALUE_PAUSE);
  }

  rewindVideos() {
    this.sendMessage(Utils.MESSAGE_VALUE_REWIND);
  }

  sendMessage(msg: string = 'Client Message') {
    this.chat.sendMsg(msg);
  }

  getConnectedClients() {
    return Object.keys(this.connected_clients);
  }
}
