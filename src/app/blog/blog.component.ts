import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { AuthService } from '../auth.service';
import {FileUploader} from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  uploader: FileUploader

  constructor(private newService: CommonService, public auth: AuthService, private http: HttpClient){

  }

  //the data inside a blogpost, 3 strings: 2 imgs 1 title
  postData;
  //Save or Edit
  valButton = "Save";
  //content1, an img
  selectedFile: File = null;
  //content2, an img
  selectedFile2: File = null;

  ngOnInit() {
    //get a post
    this.newService.getPost().subscribe(data => this.postData = data)
  }

  onSave = function(post, isValid: boolean) {

    var reader:FileReader = new FileReader();
    var reader2:FileReader = new FileReader();


    //Promise chain for making a post

      let promise = new Promise((resolve, reject) => {
        reader.readAsDataURL(this.selectedFile);
        reader.onloadend = () => {
            resolve(reader.result.split(',')[1]);
        };
      }).then(data => {
        post.content = data;
        let promise2 = new Promise((resolve, reject) => {
          reader2.readAsDataURL(this.selectedFile2);
          reader2.onloadend = () => {
              resolve(reader2.result.split(',')[1]);
          };
        }).then(data => {
          post.content2 = data;
          post.mode = this.valButton;
          console.log(post);

          this.valButton = "Save";
          this.newService.savePost(post)
            .subscribe(data => { alert(data.data);

              this.ngOnInit();
            },error => this.errorMessage = error);
        });
      });
  }

  edit = function(postData) {
    this.id = postData._id;
    this.title = postData.name;
    this.content = postData.content;
    this.content2 = postData.content2;
    this.valButton = "Update";
  }

  delete = function(id) {
    this.newService.deletePost(id)
      .subscribe(data => {alert(data.data); this.ngOnInit();}, error => this.errorMessage = error)
  }

  getNext = function() {
    console.log(this.postData);
    this.newService.getNextPost(this.postData._id)
      .subscribe(data => {
        if (data.length===0){}else{
          this.postData = data[0];
        }
      })
  }

  getPrevious = function() {
    this.newService.getPreviousPost(this.postData._id)
    .subscribe(data => {
      if (data.length===0){}else{
        this.postData = data[0];
      }
    })
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  onFileSelected2(event) {
    this.selectedFile2 = event.target.files[0];
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
