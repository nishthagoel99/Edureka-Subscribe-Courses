
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { InfoService } from '../info.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  courses:any;
  data:any;
  constructor(private dataservice:DataService,private infoservice:InfoService) { }
  //Gets the details of all the courses stored in the database.
  showcourse(){
   this.dataservice.showcourses().
   subscribe(Courses=>{
    this.courses=Courses.data;
    this.courses=JSON.parse(this.courses);
    console.log(this.courses);
   });
  }
   //Taking all the details of the clicked block
  getname(character){
    this.data=character;
    this.infoservice.setinformation(this.data); //storing the details of the clicked block in storage
  }
  //when component loads show the courses.
  ngOnInit() {
    this.showcourse();
    }
  }

