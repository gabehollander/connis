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
}
