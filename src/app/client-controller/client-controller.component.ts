import { Component, OnInit } from '@angular/core';
import {ChatService} from '../chat-service';

@Component({
  selector: 'app-client-controller',
  templateUrl: './client-controller.component.html',
  styleUrls: ['./client-controller.component.css']
})
export class ClientControllerComponent implements OnInit {
  messages: String[] = [];

  constructor(private chat: ChatService) {}

  ngOnInit() {
    this.chat.messages.subscribe(msg => {
      console.log(msg);
      this.messages.push(msg.text);
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
