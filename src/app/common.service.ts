import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: Http) { }

  //***************CLOTHING FUNCTIONS*****************
  deleteMerchandise(id){
    return this.http.post('http://localhost:8080/api/deleteMerchandise/',{'id': id})
      .map((response: Response) => response.json())
  }
  saveMerchandise(post){
    return this.http.post('http://localhost:8080/api/saveMerchandise',post)
      .map((response: Response) => response.json())
  }
  getMerchandise(){
    return this.http.get('http://localhost:8080/api/getMerchandise/')
      .map((response: Response) => response.json())
  }
  createCharge(token){
    return this.http.post('http://localhost:8080/api/createCharge',token)
      .map((response: Response) => response.json())
  }
  //**************************************************

  //***************VIDEO FUNCTIONS****************
  saveVideo(post){
    return this.http.post('http://localhost:8080/api/saveVideo',post)
      .map((response: Response) => response.json())
  }

  getVideo(){
    return this.http.get('http://localhost:8080/api/getVideo/')
      .map((response: Response) => response.json())
  }

  deleteVideo(id){
    return this.http.post('http://localhost:8080/api/deleteVideo/',{'id': id})
      .map((response: Response) => response.json())
  }
  //**********************************************

  //**************MUSIC FUNCTIONS*****************

  saveMusic(post){
    return this.http.post('http://localhost:8080/api/saveMusic',post)
      .map((response: Response) => response.json())
  }

  getMusic(){
    return this.http.get('http://localhost:8080/api/getMusic/')
      .map((response: Response) => response.json())
  }

  deleteMusic(id){
    return this.http.post('http://localhost:8080/api/deleteMusic/',{'id': id})
      .map((response: Response) => response.json())
  }

  //************************************************

  //********************BLOG FUNCTIONS***************

  savePost(post){
    return this.http.post('http://localhost:8080/api/savePost',post)
      .map((response: Response) => response.json())
  }

  getPost(){
    return this.http.get('http://localhost:8080/api/getPost/')
      .map((response: Response) => response.json())
  }

  getNextPost(id){
    return this.http.post('http://localhost:8080/api/getNextPost',{'id': id})
      .map((response: Response) => response.json())
  }

  getPreviousPost(id){
    return this.http.post('http://localhost:8080/api/getPreviousPost',{'id': id})
      .map((response: Response) => response.json())
  }

  deletePost(id){
    return this.http.post('http://localhost:8080/api/deletePost/',{'id': id})
      .map((response: Response) => response.json())
  }

  //****************************************************
}
