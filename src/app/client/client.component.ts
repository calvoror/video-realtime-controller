import {Component, OnInit} from '@angular/core';
import {ChatService} from '../chat-service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  title = 'video-realtime-controller';
  client_id;
  video: HTMLVideoElement;

  constructor(private chat: ChatService) {
  }

  ngOnInit() {
    this.chat.sendMsg('CLIENT_CONN');

    this.chat.messages.subscribe(msg => {
      if (msg.type === 'client-id') {
        this.client_id = msg.text;
      }

      if (this.video) {
        switch (msg.text) {
          case 'PLAY':
            this.video.play();
            break;
          case 'PAUSE':
            this.video.pause();
            break;
          case 'REWIND':
            this.video.currentTime = 0;
            break;
        }
      }
    });
  }

  attachVideoUrl(video: HTMLVideoElement, input_video: HTMLInputElement) {
    video.src = URL.createObjectURL(input_video.files[0]);
    this.video = video;
  }
}
