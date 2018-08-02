import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { User } from '../user';
import { DataService } from '../data.service';
import { TokenService } from '../token.service';
import 'rxjs/Rx';
import { Router } from '@angular/router';
import {
  GoogleLoginProvider,
  AuthService
} from 'angular5-social-login';
import { InfoService } from '../info.service';

declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[DataService,TokenService,AuthService]
  
})
export class LoginComponent implements OnInit {
  userList:User[]=[];
  authtoken:string="";
  total:any;
  message:string;
  done:any;
  usermessage:string;
  emailofuser:string;
  tokenflag:boolean=true;
  adminflag:boolean=true;
  display:boolean=false;
  disable:boolean=false;;
  islogin:boolean=false;
  email:string;
  authtoken1:string;
  donx:any;
  
email1:string;
name1:string;
userID:string;
googleflag:boolean=false;

usermessage2:string;
email2:string;
emailPattern = "[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"; 
  constructor(private infoservice:InfoService,private socialAuthService:AuthService,private dataservice:DataService,private tokenservice:TokenService,public router:Router) { }

  @ViewChild('openModal') openModal:ElementRef;
  @ViewChild('confirm') confirm:ElementRef;
  @ViewChild('emailcon') emailcon:ElementRef;
  @ViewChild('passcon') passcon:ElementRef;
  x:number=0;

  clicked(){
    this.x=1;
    console.log(this.x);
  }

//signing up
adduser(form){
  this.email3=form.value.email;
  console.log(form.value.password);
  console.log(this.x);
  if(this.x==1){
    this.addpass();
  }else{
  let newuser:User={
     email:form.value.email,
     password:form.value.password
  }
  this.dataservice.adduservalue(newuser)
  .subscribe(Userx=>{
    this.authtoken=Userx.token;
    this.usermessage=Userx.message;
    this.adminflag=Userx.admin;
    this.nameofuser=Userx.name;
    this.infoservice.setname(this.nameofuser);
    this.tokenservice.setflag(this.adminflag);
    console.log(this.authtoken);
    this.tokenservice.set(this.authtoken);
    this.dataservice.setauthheader();
    });
  }
}
  forgotpass:boolean=false;



  public get tokenofflag():boolean{
  //  console.log(this.tokenservice.get());
    if((this.authtoken=='null')||(this.authtoken==null)||(this.tokenservice.get()=='null')||(this.tokenservice.get()==null)){
      return true;
    }else{
      return false;
    } 
  }

  settingcount1(){
    this.tokenservice.setcount('0');
  }
  settingcount(){
    this.tokenservice.setcount('0');
    document.location.reload();
  }


   gotodisplay(){
    if((this.tokenservice.get()!='null')||(this.tokenservice.get()!=null)){
      document.location.reload();
    }
  
   }
   nameofuser:string;
   name3:string;
   email3:string;
   pass1:string;
   pass2:string;
   otp:any;

   //adding 0s in otp
   pad_with_zeroes(number, length) {
    var my_string = '' + number;
    while (my_string.length < length) {
        my_string = '0' + my_string;
    }
    return my_string;
}
messagex:string;
//signup
   adduser2(form){
      this.name3=form.value.name;
       this.email3=form.value.email;
       this.pass1=form.value.pass1;
      this.pass2=form.value.pass2;
      let user={
        email:this.email3
      }
      this.dataservice.check(user)
      .subscribe(ans=>{
        this.messagex=ans.message;
        this.done=ans.done;
        console.log(this.done);
      if(this.done==0){
        if(this.pass1==this.pass2){
          $('.modal').modal('hide')
      this.emailcon.nativeElement.click();
          this.otp=Math.random()*10000;
          this.otp=Math.round(this.otp);
        this.otp=this.pad_with_zeroes(this.otp,4);
        console.log(this.otp);
        let user={
          email:this.email3,
          otp:this.otp
        }
        this.dataservice.email(user).subscribe(x=>{
          console.log(x.message);
        });
      
        }else{
          this.message='Passwords don\'t match';
        }
      
      }else if(this.done==1){
        this.message='Email exists';
      }
    });
  
   }


   umessage:string;

//confirm otp
   adduser3(farm){
     console.log(this.forgotpass);
     if(farm.value.otp==this.otp){
       console.log(this.x);
       if(this.x!=1){
        let newu={
          email:this.email3,
          name:this.name3,
          pass1:this.pass1,
          pass2:this.pass2
        }
        this.dataservice.signup(newu)
        .subscribe(Userx=>{
          this.message=Userx.message;
          console.log(this.message);
          this.done=(Userx.done);
          if((this.done=='1')||(this.done==1)){
            console.log(this.done);
            let newuser:User={
              email:this.email3,
              password:this.pass1
           }
           this.dataservice.adduservalue(newuser)
           .subscribe(Userx=>{
             this.authtoken=Userx.token;
             this.nameofuser=Userx.name;
             this.infoservice.setname(this.nameofuser);
             this.tokenservice.set(this.authtoken);
             this.dataservice.setauthheader(); 
          });
        }
        });
      }else {
        this.passcon.nativeElement.click();
           }
     }else{
       this.umessage='Wrong OTP!'
     }
   }

 umessage2:string;

 //change password
changing(farm){
  this.pass1=farm.value.pass1;
  let passworduser={
    pass1:farm.value.pass1,
    pass2:farm.value.pass2,
    email:this.email3
  }
  this.dataservice.forgotpass(passworduser)
  .subscribe(user=>{
    if(user.done!=1){
      this.umessage2=user.message;
    }else{
      let newuser:User={
        email:this.email3,
        password:this.pass1
     }
     this.dataservice.adduservalue(newuser)
     .subscribe(Userx=>{
       this.authtoken=Userx.token;
       this.nameofuser=Userx.name;
       this.infoservice.setname(this.nameofuser);
       this.tokenservice.set(this.authtoken);
       this.dataservice.setauthheader(); 
    });
    }
  });
}

//confirm name and email
adding(form){
  let newurs={
    UserID:this.userID,
    name:form.value.name,
    email:form.value.email,
    token:this.authtoken
  }
  this.dataservice.signup(newurs).subscribe(u=>{
    this.message=u.message;
    this.done=u.done;
    console.log(this.message);
    if((this.done=='1')||(this.done==1)){
      let urs={
        email:form.value.email,
        token:this.authtoken
      }
     this.dataservice.adduservalue(urs).subscribe(u=>{
      this.authtoken1=u.token;
      this.nameofuser=u.name;
      this.infoservice.setname(this.nameofuser);
      this.tokenservice.set(this.authtoken1);
      this.dataservice.setauthheader(); 
      console.log(this.authtoken1);
     });
    }
  });
}



  public socialSignUp(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    console.log(this.googleflag);
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        // Now sign-in with userData
        this.nameofuser=userData.name;
          //  this.authtoken=userData.token;
          if(userData.idToken){
            this.authtoken=userData.idToken;
          }else{
            console.log(userData);
            this.authtoken=userData.token;
            
          }
          let user={
            email:this.email1
          }
          this.dataservice.check(user)
          .subscribe(ans=>{
            this.message=ans.message;
            console.log(this.message);
          });
          this.email1=userData.email;
            this.name1=userData.name;
            this.userID=userData.id;
            console.log(this.name1);
          this.confirm.nativeElement.click();
        });
      
      }


public socialSignIn(socialPlatform : string) {
        let socialPlatformProvider;
        if(socialPlatform == "google"){
          socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        }
        
        this.socialAuthService.signIn(socialPlatformProvider).then(
          (userData) => {
            console.log(socialPlatform+" sign in data : " , userData);
            // Now sign-in with userData
            this.nameofuser=userData.name;
              if(userData.idToken){
                this.authtoken=userData.idToken;
              }else{
                console.log(userData);
                this.authtoken=userData.token;
                console.log(this.authtoken);
              }
              var user={
                email:userData.email,
                token:this.authtoken
              }
              var e={
                email:userData.email
              }
              this.dataservice.adduservalue(user)
              .subscribe(Userx=>{
                this.authtoken1=Userx.token;
                this.tokenservice.set(this.authtoken1);
                this.dataservice.setauthheader(); 
                this.nameofuser=Userx.name;
                this.infoservice.setname(this.nameofuser);
                console.log(this.nameofuser);
                this.usermessage=Userx.message;
                console.log(this.usermessage);
                });
            });
          }
  
//otp after signup
addpass(){
  console.log(this.email3);
      this.forgotpass=true;
            let e={
              email:this.email3
            }
            console.log(e);
            this.dataservice.check(e).subscribe(
              u=>{
                console.log(u.done);
                this.donx=u.done;
                if(this.donx==0){
                  this.usermessage='Sign Up first!';
                }else if(this.donx==1){ 
                $('#myModal').modal('hide');
                  this.emailcon.nativeElement.click();
                  this.otp=Math.random()*10000;
                  this.otp=Math.round(this.otp);
                this.otp=this.pad_with_zeroes(this.otp,4);
                console.log(this.otp);
                let user={
                  email:this.email3,
                  otp:this.otp
                }
                this.dataservice.email(user).subscribe(x=>{
                  console.log(x.message);
                });
                }
              });
            console.log(this.forgotpass);
          }

checkpassword(){

}

  ngOnInit() {
    this.socialAuthService.signOut();
    this.openModal.nativeElement.click();
  
}
ngOnDestroy(){
  this.socialAuthService.signOut();
}

}

