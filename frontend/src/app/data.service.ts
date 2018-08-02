import { Injectable } from '@angular/core';
import { Http, Response , Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { count } from 'rxjs/operators';

@Injectable()
export class DataService {

  constructor(private http:Http,private tokenservice:TokenService,public router:Router) { }

  getvalue(){
    let headers1=new Headers();
    headers1.append('authorization',this.authheader());
    return this.http.get("http://localhost:3000/login/display",{headers:headers1})
    .map(res =>res.json().data);
  }

  adduservalue(newuser){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/login',newuser,{headers:headers})
    .map(res=>res.json());
  }

  signup(u){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/login/signup',u,{headers:headers})
    .map(res=>res.json());
  }
  
  check(u){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/login/check',u,{headers:headers})
    .map(res=>res.json());
  }

  email(u){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/email',u,{headers:headers})
    .map(res=>res.json());
  }

    
  forgotpass(u){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/login/change',u,{headers:headers})
    .map(res=>res.json());
  }

  toggling(u){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/aws/option',u,{headers:headers})
    .map(res=>res.json());
  }
  
  aws(x){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/aws',x,{headers:headers})
    .map(res=>res.json());
  }

  getheading(){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/aws',{headers:headers})
    .map(res=>res.json());
  }



  createcourse(cour){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/course',cour,{headers:headers})
    .map(res=>res.json());
  }


  show(){
    let headers=new Headers();
    headers.append('authorization',this.authheader());
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/enroll/show',{headers:headers})
    .map(res=>res.json());
  }
  
  

  public authheader():string {
    return ('Bearer '+ this.tokenservice.get());
  }
  public setauthheader():void {
    let headers1=new Headers();
    headers1.append('authorization',this.authheader());
  }
  
  addcourse(newcourse){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    headers.append('authorization',this.authheader());
    return this.http.post('http://localhost:3000/enroll',newcourse,{headers:headers})
    .map(res=>res.json());
  }
  enr(enr){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    headers.append('authorization',this.authheader());
    return this.http.post('http://localhost:3000/enroll/co',enr,{headers:headers})
    .map(res=>res.json());
  }

  showcourses(){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/course',{headers:headers})
    .map(res=>res.json());
  }

  //check if the user is authenticated or not.
  public  isAuthenticated():boolean {
     if((this.tokenservice.get()=='null')||(this.tokenservice.get()==null))
     return false; //not a registered user.
    else{
    return true;
    }
  }
  

}