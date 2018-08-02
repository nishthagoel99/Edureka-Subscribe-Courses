import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes,RouterModule} from '@angular/router'
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DisplayComponent } from './display/display.component';
import { CourseComponent } from './course/course.component';
import { CoursedetailComponent } from './coursedetail/coursedetail.component';
import { EnrolledComponent } from './enrolled/enrolled.component';
import { CoursepageComponent } from './coursepage/coursepage.component';
import { CreationComponent } from './creation/creation.component';
import { AwsComponent } from './aws/aws.component';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular5-social-login";

const ROUTES:Routes=[
  {path:'',component:DisplayComponent},
  {path:'login',component:LoginComponent},
 {path:'coursepage',component:CoursepageComponent},
 {path:'coursedetail',component:CoursedetailComponent}
];

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("185382265215-sm4tf6lnqmnecq3o21vmncalk4a2g5j7.apps.googleusercontent.com")
        }
      ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CoursedetailComponent,
    DisplayComponent,
    CourseComponent,
    EnrolledComponent,
    CoursepageComponent,
    CreationComponent,
    AwsComponent,
  ],
  imports: [
    BrowserModule,HttpModule
    ,RouterModule.forRoot(ROUTES),FormsModule,
  ],
  providers: [
    { provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs}],

  bootstrap: [AppComponent]
})
export class AppModule { }
