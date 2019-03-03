import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxMasonryModule } from 'ngx-masonry';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelect2Module } from 'ng-select2';
//import { HttpModule } from '@angular/http'; //NEW
import { HttpClientModule } from  '@angular/common/http';
import { NgxTinymceModule } from 'ngx-tinymce';


import { AppRoutes } from  "./app.routes";
import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider,
    FacebookLoginProvider,
} from "angular-6-social-login";
import { AuthGuard } from './auth.guard';
import { AnonymousGuard } from './auth.anonymusguard'; 

import { AppComponent } from './app.component';
import { HomePageComponent } from './frontend/home-page/home-page.component';
import { LoginComponent } from './backend/login/login.component';
import { DashboardComponent } from './backend/dashboard/dashboard.component';
import { HeaderComponent } from './frontend/common/header/header.component';
import { TeachersComponent } from './frontend/teachers/teachers.component';
import { FrontendComponent } from './frontend/frontend.component';
import { SearchBarComponent } from './frontend/common/search-bar/search-bar.component';
import { ViewTeachersComponent } from './frontend/teachers/view-teachers/view-teachers.component';
import { CreateTeacherComponent } from './frontend/teachers/profile/create-teacher/create-teacher.component';
import { ProfileComponent } from './frontend/teachers/profile/profile.component';
import { SettingsComponent } from './frontend/teachers/profile/settings/settings.component';
import { ExperienceComponent } from './frontend/teachers/profile/experience/experience.component';
import { QualificationsComponent } from './frontend/teachers/profile/qualifications/qualifications.component';
import { ClassesComponent } from './frontend/teachers/profile/classes/classes.component';
import { AdsComponent } from './frontend/teachers/profile/ads/ads.component';
import { FrontLoginComponent } from './frontend/front-login/front-login.component';
import { MyProfileComponent } from './frontend/teachers/profile/my-profile/my-profile.component';


// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("392940348184154")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("214975885995-oglkqnpvto93g747fc7idbv2ql79pp2f.apps.googleusercontent.com")
        }
      ]
  );
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    DashboardComponent, 
    HeaderComponent, TeachersComponent, FrontendComponent, SearchBarComponent, ViewTeachersComponent, CreateTeacherComponent,  ProfileComponent, SettingsComponent, ExperienceComponent, QualificationsComponent, ClassesComponent, AdsComponent, FrontLoginComponent, MyProfileComponent
  ],
  imports: [
    BrowserModule, NgxMasonryModule, FormsModule,  ReactiveFormsModule, NgSelect2Module,  HttpClientModule,
    RouterModule.forRoot(AppRoutes, { useHash: false }), SocialLoginModule, NgxTinymceModule.forRoot({ 
       baseURL: '/assets/tinymce/',
    })
  ],
  providers: [ AuthGuard, AnonymousGuard,
      {
        provide: AuthServiceConfig,
        useFactory: getAuthServiceConfigs
      }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
