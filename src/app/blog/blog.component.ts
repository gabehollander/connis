import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {



  constructor(private newService: CommonService, public auth: AuthService){}

  postData;
  valButton = "Save";

  ngOnInit() {
    this.newService.getPost().subscribe(data => this.postData = data)
  }

  onSave = function(post, isValid: boolean) {
    post.mode = this.valButton;
    this.newService.savePost(post)
      .subscribe(data => { alert(data.data);

        this.ngOnInit();
      },error => this.errorMessage = error);
  }

  edit = function(kk) {
    this.id = kk._id;
    this.name = kk.name;
    this.content = kk.content;
    this.valButton = "Update";
  }

  delete = function(id) {
    this.newService.deletePost(id)
      .subscribe(data => {alert(data.data); this.ngOnInit();}, error => this.errorMessage = error)
  }

}
