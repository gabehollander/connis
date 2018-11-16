import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { AuthService } from '../auth.service';
import {FileUploader} from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {

  constructor(private newService: CommonService, public auth: AuthService, private http: HttpClient){

  }

  postData;
  //Save or Edit
  valButton = "Save";
  //content1, an img
  selectedFile: File = null;
  //content2, an img

  ngOnInit() {
    this.newService.getMusic().subscribe(data => this.postData = data)
    console.log(this.postData);
  }

  onSave = function(post, isValid: boolean) {

    var reader:FileReader = new FileReader();

    //Promise chain for making a post

    let promise = new Promise((resolve, reject) => {
      reader.readAsDataURL(this.selectedFile);
      reader.onloadend = () => {
          resolve(reader.result.split(',')[1]);
      };

    }).then(data => {
      post.content = data;
      post.mode = this.valButton;
      this.valButton = "Save";
      this.newService.saveMusic(post)
        .subscribe(data => { alert(data.data);
          this.ngOnInit();
        },error => this.errorMessage = error);
    });
  }

  delete = function(id) {
    this.newService.deleteMusic(id)
      .subscribe(data => {alert(data.data); this.ngOnInit();}, error => this.errorMessage = error)
  }


  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  getImage(buf){
    return "data:image/jpeg;base64," + buf;
  }

  toggleCreate(){
    if(this.valButton == "Update"){
      this.valButton = "Save";
    }else{
      this.valButton = "Update";
    }
  }

}
