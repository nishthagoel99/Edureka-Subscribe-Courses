import { Component, ChangeDetectorRef } from '@angular/core';
import { DataService } from './data.service';
import { TokenService } from './token.service';
import { InfoService } from './info.service';
import { AuthService } from 'angular5-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[DataService,TokenService,AuthService]
})

export class AppComponent {

  constructor(private infoservice:InfoService,private socialAuthService:AuthService,public cd:ChangeDetectorRef,private dataservice:DataService,private tokenservice:TokenService){}
 
  //the person has clicked the button login
  count(){
    this.tokenservice.setcount('1');
  }

  //to check if has logged in or not.
  public get authenticated(): boolean {
    return this.dataservice.isAuthenticated();  
  }

//on logout deleting all the values stored in storage.
  setcount(){
    this.tokenservice.setcount('0'); 
    this.tokenservice.deleteToken(); 
    this.tokenservice.deleteflag(); 
    this.tokenservice.deletecount();  
    this.infoservice.deleteinform();
    this.infoservice.deleteinformation();
    this.infoservice.deletename();  
  } 

  ngOnInit() {
   this.tokenservice.setcount('0');
   this.socialAuthService.signOut();
  }
  
  ngAfterViewChecked(){
    this.cd.detectChanges();
  }



}
