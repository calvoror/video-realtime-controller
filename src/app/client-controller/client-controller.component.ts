import {Component, NgModule, OnInit} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition, keyframes
} from '@angular/animations';
import {ChatService} from '../chat-service';
import {Utils} from '../utils';

@Component({
  selector: 'app-client-controller',
  templateUrl: './client-controller.component.html',
  styleUrls: ['./client-controller.component.css'],
  animations: [
    trigger('clientState', [
      state('video_selected', style({
        backgroundColor: 'darkorange'
      })),
      state('fullscreen', style({
        backgroundColor: 'green'
      })),
      transition('no_video => video_selected', animate('100ms ease-in')),
      transition('video_selected => fullscreen', animate('100ms ease-out')),
      transition('void => *', [
        animate(400, keyframes([
          style({opacity: 0, transform: 'translateY(100%)', offset: 0}),
          style({opacity: 1, transform: 'translateY(-15px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate(400, keyframes([
          style({opacity: 0, transform: 'translateY(0)', offset: 0}),
          style({opacity: 1, transform: 'translateY(-15px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateY(100%)',     offset: 1.0})
        ]))
      ])
    ])
  ]
})
export class ClientControllerComponent implements OnInit {
  utils = Utils;
  messages: string[] = [];
  // Associative table with client_id as key
  connected_clients: { [client_id: string]: { video_name: string, state: string } } = {};

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
          this.connected_clients[msg.text] = {video_name: '', state: 'no_video'};
          break;
        case 'client-disconnection':
          delete this.connected_clients[msg.text];
          break;
        case 'client-video-selected':
          this.connected_clients[msg.client].video_name = msg.video;
          this.connected_clients[msg.client].state = 'video_selected';
          break;
        case 'client-video-fullscreen':
          console.log(msg.state);
          this.connected_clients[msg.client].state = (msg.state === 'enter-fullscreen' ? 'fullscreen' : 'video_selected');
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

  pingClient(client: string) {
    this.chat.send('ping-client', client);
  }
}
