import { Injectable } from '@angular/core';
import { Routes, CanActivate} from '@angular/router';

import { HomePageComponent } from './frontend/home-page/home-page.component';
import { TeachersComponent } from './frontend/teachers/teachers.component';
import { FrontendComponent } from './frontend/frontend.component';
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


import { AuthGuard } from './auth.guard'; 
import { AnonymousGuard } from './auth.anonymusguard'; 


export const AppRoutes: Routes = [

	 
	{ path: '',
		component: FrontendComponent, 

		children: [

			{ path: '',
				component: HomePageComponent,
      			

			},  
			
			{ path: 'teachers',
				component: TeachersComponent, 
			},

			{ path: 'teachers/view-teacher/:id',
				component: ViewTeachersComponent
			}, 

			{ path: 'login',
				component: FrontLoginComponent,
				canActivate: [AuthGuard],
			}, 

			{ path: 'profile/:id',
				component: ProfileComponent, 
				canActivate: [AuthGuard],
				children: [

					{ 
						path: 'create-teacher',
						component: CreateTeacherComponent,

					},

					{ 
						path: 'account-settings',
						component: SettingsComponent
					},

					{ 
						path: 'experience',
						component: ExperienceComponent
					},

					{ 
						path: 'qualifications',
						component: QualificationsComponent
					},

					{ 
						path: 'my-class',
						component: ClassesComponent
					},

					{ 
						path: 'my-ads',
						component: AdsComponent
					},

					{ 
						path: 'my-profile',
						component: MyProfileComponent
					},

					
				]
			},

		]
	}, 
	  
	


];
