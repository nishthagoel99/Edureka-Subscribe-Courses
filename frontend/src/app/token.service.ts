import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  //getting the token.
  public get(): string {
    localStorage.getItem('token');
    return localStorage.getItem('token');
  }
  //setting the token in localStorage
  public set(token: string): void {
    localStorage.setItem('token',token);
  }
//deleting the token in LocalStorage
  public deleteToken(): void {
    localStorage.removeItem('token');
  }
//Getting the admin Flag
  public getflag() {
    localStorage.getItem('adminflag');
    return localStorage.getItem('adminflag');
  }
//Setting the admin flag in localstorage
  public setflag(adminflag): void {
    localStorage.setItem('adminflag',adminflag);
  }
  //deleting the admin flag from localstorage
  public deleteflag(): void {
    localStorage.removeItem('adminflag');
  }
  //getting the count
  public getcount(){
   return sessionStorage.getItem('count');
  }
  //setting the value of count in sessionstorage
  public setcount(count){
    sessionStorage.setItem('count',count);
  }
  //deleting count
  public deletecount():void {
    sessionStorage.removeItem('count');
  }
  //getting the mode(night/day)
  public getnight(){
    return sessionStorage.getItem('night');
   }
   //setting the value of mode in session storage
   public setnight(night){
     sessionStorage.setItem('night',night);
   }
   //deleting the value of mode from session storage
   public deletenight():void {
     sessionStorage.removeItem('night');
   }
   
   
  
}

