import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { TokenService } from '../token.service';
import { InfoService } from '../info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  display1:boolean;
  total:any;
  subflag:boolean=false;
  adminflag:boolean=false;
  countflag:boolean=true;
  CourseTitle:any;
  CourseRating:string;
  data:any;
  datas:string;
  createflag=false;
  CourseValue:string;
  CourseImage:string;
  constructor(private infoservice:InfoService,private router:Router,private dataservice:DataService,private tokenservice:TokenService) { }
  
 public get admingetflag() {
  if(this.tokenservice.getflag()=='true'){
    return true; //it is an admin
  }else {
    return false;
  }
}
gettoken(){
  if((this.tokenservice.get()=='null')||(this.tokenservice.get()==null)){
    return true;
  }else
     return false;
  }


  getuser(){
  this.dataservice.getvalue()
  .subscribe(Users=>{
    this.total=Users;
    this.total=JSON.parse(this.total);
    console.log(this.total);
    this.display1=true;
  });
}

  public getcountt() {
    if(this.tokenservice.getcount()=='1'){
      return true;
    }else{
      return false;
    }
  }

  nameofuser:string;
  public name(){
   this.nameofuser= this.infoservice.getname()
  }

  setflag(){
    this.subflag=false;
  }

  createco(){
    this.createflag=true;
  }

  showsub(){
    this.dataservice.show()
    .subscribe(Course=>{
      this.data=Course.data;
      this.data=JSON.parse(this.data);
    });
      this.subflag=true;
      console.log(this.subflag);
  }
  
  gotopage(){
    this.router.navigate(['/coursepage']);
    document.location.reload();
  }


  ngOnInit() {
    this.name();
  }

}
