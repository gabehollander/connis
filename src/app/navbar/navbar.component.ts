import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public auth: AuthService) { }

  isMuted :boolean;
  video;

  ngOnInit() {
    this.video = document.getElementById("myVideo");
    this.video.muted = true;
    this.isMuted = true;
  }

  toggleSound(){
    this.isMuted = !this.isMuted;
    this.video.muted = this.isMuted;
  }

}
