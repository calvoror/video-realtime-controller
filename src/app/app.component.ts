import {Component, OnInit} from '@angular/core';
import {ChatService} from './chat-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private chat: ChatService) {
  }

  ngOnInit() {
    this.sendMessage();
  }

  sendMessage(msg: String = 'Test Message') {
    this.chat.sendMsg(msg);
  }
}
