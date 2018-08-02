import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { DataService } from '../data.service';
import { TokenService } from '../token.service';
import { Router } from '@angular/router';
import { InfoService } from '../info.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-coursedetail',
  templateUrl: './coursedetail.component.html',
  styleUrls: ['./coursedetail.component.css']
})
export class CoursedetailComponent implements OnInit {
  detail:any
  displayflag:boolean=false;
  tokenflag:boolean;
  CourseTitle:string;
  details:any;
  y:any;
  message:any;
  message2:any;
  messageflag:boolean;
  CourseVideo:any;
  videoURL:any;
    video_id:any;
  constructor(private dataservice:DataService,private santizer:DomSanitizer,private infoservice:InfoService,private tokenservice:TokenService) { }
  @ViewChild('openModal') openModal:ElementRef;


  //checking if video for that course is available or not
  public get videoflag():boolean{
    if(this.CourseVideo!=""){
      return true;
    }else{
      return false;
    }
  }
    //youtube plugin
    getvideo(item){
      this.videoURL=item.CourseVideo;
      this.video_id = this.videoURL.split('v=')[1].split('&')[0];
      return this.santizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+ this.video_id);
    }
   
    //after clicking the image, the video modal opens.
    showvideo(){
      this.openModal.nativeElement.click();
    }

      //check if the user has logged in or not
 public gettoken(){
  if((this.tokenservice.get()==null)||(this.tokenservice.get()=='null')){
  return true;
  }else{
    return false;
    }
  }
  

  //if the enroll button has been clicked return true and then change enroll to enrolled
  public getcountt() {
    if(this.tokenservice.getcount()=='1'){
        return true;
    } 
  }

  //enrolling to the course clicked
  public enrolling(){
    this.detail=this.infoservice.getinformation();
    this.details=JSON.stringify(this.detail);
    this.y=JSON.parse(this.details);
    this.CourseTitle=this.y.CourseTitle;
    let newcourse={
      CourseTitle:this.CourseTitle
    }
    this.dataservice.addcourse(newcourse).subscribe(C=>{
      this.message=C.message;
      this.infoservice.setinform(this.message);
    });
  }




    
    //Getting the details of the course clicked
  getdetails(){
    this.detail=this.infoservice.getinformation();
    this.details=JSON.stringify(this.detail);
    this.y=JSON.parse(this.details);
    this.CourseVideo=this.y.CourseVideo;
    }
    //if enrolled, changing enroll now to enrolled
  enrd(){
    this.detail=this.infoservice.getinformation();
    this.details=JSON.stringify(this.detail);
    this.y=JSON.parse(this.details);
    this.CourseTitle=this.y.CourseTitle;
    let newc={
      CourseTitle:this.CourseTitle
    }
    this.dataservice.enr(newc).subscribe(X=>{
      this.message2=X.message;
      if(this.message2=='notdone'){ //course isn't enrolled
        this.messageflag=false;
      }else if(this.message2=='done'){ //course is enrolled
        this.messageflag=true;
      }
    });
  }
  //clicking on enroll button will set count=1
  count(){ this.tokenservice.setcount('1');}

  ngOnInit() {
    this.enrd();
    this.getdetails();
}
}
