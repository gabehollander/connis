import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from '../common.service';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  constructor(private newService: CommonService,
    public auth: AuthService,
    private http: HttpClient,
    private sanitizer: DomSanitizer) { }

  postData;
  //Save or Edit
  valButton = "Save";

  ngOnInit() {
    this.newService.getVideo().subscribe(data => this.postData = data)
  }

  onSave = function(post, isValid: boolean) {

    post.mode = this.valButton;
    this.valButton = "Save";
    this.newService.saveVideo(post)
      .subscribe(data => { alert(data.data);
        this.ngOnInit();
      },error => this.errorMessage = error);
  }

  delete = function(id) {
    this.newService.deleteVideo(id)
      .subscribe(data => {alert(data.data); this.ngOnInit();}, error => this.errorMessage = error)
  }

  getEmbedUrl(post) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+ post.embed);
  }


}
