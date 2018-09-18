import {Component, OnInit} from '@angular/core';
import {ChatService} from '../chat-service';
import {Utils} from '../utils';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  utils = Utils;
  client_id: string;
  video: HTMLVideoElement;

  constructor(private chat: ChatService) {
  }

  ngOnInit() {
    // this.chat.sendMsg('CLIENT_CONN');

    this.chat.messages.subscribe(msg => {
      switch (msg.type) {
        case 'client-id':
          this.client_id = msg.text;
          break;
        case 'identification':
          this.chat.send('CLIENT_CONN', 'CLIENT_CONN');
          break;
        default:
          if (this.video) {
            switch (msg.text) {
              case Utils.MESSAGE_VALUE_PLAY:
                this.video.play();
                break;
              case Utils.MESSAGE_VALUE_PAUSE:
                this.video.pause();
                break;
              case Utils.MESSAGE_VALUE_REWIND:
                this.video.currentTime = 0;
                break;
            }
          }
          break;
      }
    });
  }

  attachVideoUrl(video: HTMLVideoElement, input_video: HTMLInputElement) {
    const video_selected = input_video.files[0];
    const video_filename = video_selected.name;
    video.src = URL.createObjectURL(video_selected);
    this.video = video;
    this.chat.send('videourl', video_filename);
  }
}
