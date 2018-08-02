import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.css']
})
export class CreationComponent implements OnInit {
  message:string;
  constructor(private router:Router,private dataservice:DataService) { }

  
  @ViewChild('openModal') openModal:ElementRef;
  
 

  addc(form){
    let newcourse={
      CourseTitle:form.value.CourseTitle,
      CourseRating:form.value.CourseRating,
      CourseValue:form.value.CourseValue,
      CourseImage:form.value.CourseImage,
      CourseVideo:form.value.CourseVideo
    }
   this.dataservice.createcourse(newcourse)
   .subscribe(C=>{
    this.message=C.message;
    console.log(this.message);
   });
   
   this.checkmsg();
   
  }
  

 
   checkmsg(){
    if(this.message=='inserted'){
      return true;
    }else{
      return false;
    }
    
  }

  
  gotodisplay(){
    this.router.navigate(['/']);
    document.location.reload();
  } 


  ngOnInit() {
  this.openModal.nativeElement.click();
  }

}
