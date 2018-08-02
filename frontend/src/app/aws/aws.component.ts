import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-aws',
  templateUrl: './aws.component.html',
  styleUrls: ['./aws.component.css']
})
export class AwsComponent implements OnInit {
  data:string;
  
datax:string;
titlex:string;


  constructor(private dataservice:DataService) { }

  showaws(title){
    console.log(title);
    let d={
      main:title
    }
    this.dataservice.aws(d).subscribe(aws=>{
      this.data=aws.data;
      this.data=JSON.parse(this.data);
      console.log(this.data);
        });
  }
  
  toggle(y){
    $('.inside .collapse').on('shown.bs.collapse', function(){
      $(this).parent().find(".fa-plus-circle").removeClass("fa-plus-circle").addClass("fa-minus-circle");
      }).on('hidden.bs.collapse', function(){
      $(this).parent().find(".fa-minus-circle").removeClass("fa-minus-circle").addClass("fa-plus-circle");
      });
   
    this.getx(y);
  }
  value:boolean=false;

  toggle1(y){
    $('.main .collapse').on('shown.bs.collapse', function(){
      $(this).parent().find(".fa-angle-down").removeClass("fa-angle-down").addClass("fa-angle-up");
      }).on('hidden.bs.collapse', function(){
      $(this).parent().find(".fa-angle-up").removeClass("fa-angle-up").addClass("fa-angle-down");
      });
    this.gettitle(y);

  }

  gettitle(title){
    this.titlex=title.Main;
    console.log(this.titlex);
    this.showaws(this.titlex);
    $('.panel-collapse.in')
    .collapse('hide');
  }

  getx(x){
    let u={
      main:this.titlex,
      heading:x.Heading
    }
    console.log(u)
    this.dataservice.toggling(u)
    .subscribe(user=>{
      this.datax=user.data;
      this.datax=JSON.parse(this.datax);
      console.log(this.datax)
    });
    $('.inside .panel-collapse.in')
    .collapse('hide');
  }

titles:string

  showtitles(){
    this.dataservice.getheading().subscribe(user=>{
      this.titles=user.data;
      this.titles=JSON.parse(this.titles);
      console.log(this.titles);
    })
  }


  ngOnInit() {
    this.showtitles();
    
    }


}

/*

   $(".acitemx h4").click(function () {
      $.header = $(this);
      $.content = $.header.next();
      $.content.slideToggle(500, function () {
          $(this).parent().toggleClass('current');
      });
      $(this).parent().siblings().find('.accx').slideUp(); // Added code
  });
  $('.acitemx').eq(0).addClass('.acitemx').find('.accx').css('display', 'block');
*/
