import {Component, OnInit} from '@angular/core';
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
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  animations: [
    trigger('clientPing', [
      transition('* => *', [
        animate(400, keyframes([
          style({backgroundColor: 'red', offset: 0}),
          style({backgroundColor: 'orangered',  offset: 0.3}),
          style({backgroundColor: 'yellow',  offset: 0.6}),
          style({backgroundColor: '',     offset: 1.0})
        ]))
      ])
    ])
  ]
})
export class ClientComponent implements OnInit {
  utils = Utils;
  client_id: string;
  ping: number = 1;
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

          switch (msg.text) {
            case Utils.PING_CLIENT:
              console.log('Ping !');
              this.ping += 1;
              break;
          }

          break;
      }
    });

    document.onfullscreenchange = () => {
      this.sendFullscreenMessage(document.fullscreenElement);
    };
    // document.onwebkitfullscreenchange = () => {
    //   this.sendFullscreenMessage(document.webkitFullscreenElement);
    // };
    // document.onmozfullscreenchange = () => {
    //   this.sendFullscreenMessage(document.mozFullscreenElement);
    // };
    // document.onmsfullscreenchange = () => {
    //   this.sendFullscreenMessage(document.msFullscreenElement);
    // };
  }

  sendFullscreenMessage(fullscreenElement) {
    if (fullscreenElement) {
      this.chat.send('client-state', 'enter-fullscreen');
    } else {
      this.chat.send('client-state', 'exit-fullscreen');
    }
  }

  /**
   * Define video url of the video html element
   * @param video
   * @param input_video
   */
  attachVideoUrl(video: HTMLVideoElement, input_video: HTMLInputElement) {
    const video_selected = input_video.files[0];
    const video_filename = video_selected.name;
    video.src = URL.createObjectURL(video_selected);
    this.video = video;
    this.chat.send('videourl', video_filename);
  }

  /**
   * Request to go fullscreen
   */
  goFullScreen() {
    if (this.video) {
      this.video.requestFullscreen();
      // if (this.video.webkitSupportsFullscreen) {
      //   this.video.webkitRequestFullScreen();
      // } else {
      //   this.video.requestFullscreen();
      // }
    }
  }
}
