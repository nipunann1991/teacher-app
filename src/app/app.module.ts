import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxMasonryModule } from 'ngx-masonry';


import { AppRoutes } from  "./app.routes";

import { AppComponent } from './app.component';
import { HomePageComponent } from './frontend/home-page/home-page.component';
import { LoginComponent } from './backend/login/login.component';
import { DashboardComponent } from './backend/dashboard/dashboard.component';
import { HeaderComponent } from './frontend/common/header/header.component';
import { TeachersComponent } from './frontend/teachers/teachers.component';
import { FrontendComponent } from './frontend/frontend.component';
import { SearchBarComponent } from './frontend/common/search-bar/search-bar.component';
import { ViewTeachersComponent } from './frontend/teachers/view-teachers/view-teachers.component';
import { CreateTeacherComponent } from './frontend/teachers/create-teacher/create-teacher.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    DashboardComponent, 
    HeaderComponent, TeachersComponent, FrontendComponent, SearchBarComponent, ViewTeachersComponent, CreateTeacherComponent
  ],
  imports: [
    BrowserModule, NgxMasonryModule,
    RouterModule.forRoot(AppRoutes, { useHash: false }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
