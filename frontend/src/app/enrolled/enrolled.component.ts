import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../token.service';
import { InfoService } from '../info.service';

@Component({
  selector: 'app-enrolled',
  templateUrl: './enrolled.component.html',
  styleUrls: ['./enrolled.component.css']
})
export class EnrolledComponent implements OnInit {

  constructor(private router:Router,private infoservice:InfoService,private tokenservice:TokenService) { }
  @ViewChild('openModal') openModal:ElementRef;
  
  gotocourse(){
    this.router.navigate(['/coursepage']);
    this.tokenservice.setcount('0');
    document.location.reload();
  }

  checkmsg(){
    if(this.infoservice.getinform()=='exists'){
      return true;
    }else{
      return false;
    }
  }

  ngOnInit() {
        this.openModal.nativeElement.click();
  }

}
