import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor() { }

  //set information of course in session storage
  public  setinformation(details){
    sessionStorage.setItem('details',JSON.stringify(details));
  }
  //get information of course from session storage
  public getinformation(){
     return JSON.parse(sessionStorage.getItem('details'));
  } 
  //delete information of course from session storage
  public deleteinformation(){
    sessionStorage.removeItem('details');
  }

  //set the login message in session storage
  public  setinform(det){
    sessionStorage.setItem('det',JSON.stringify(det));
  }
  //get the message from session storage
  public getinform(){
     return JSON.parse(sessionStorage.getItem('det'));
  } 
  //delete the message from session storage
  public deleteinform(){
    sessionStorage.removeItem('det');
  }
  //set name in session storage
  public  setname(name){
    sessionStorage.setItem('name',JSON.stringify(name));
  }
  //get name from session storage
  public getname(){
     return JSON.parse(sessionStorage.getItem('name'));
  } 
  //delete name of course from session storage
  public deletename(){
    sessionStorage.removeItem('name');
  }

}
