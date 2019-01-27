import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormsModule, } from '@angular/forms';
import { CommonService } from '../common.service';
import { Http,Response,Headers,RequestOptions } from '@angular/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private newService: CommonService, public auth: AuthService){
    auth.handleAuthenticationWithHash();
  }

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
    this.newService.deleteUser(id)
      .subscribe(data => {alert(data.data); this.ngOnInit();}, error => this.errorMessage = error)
  }

}
