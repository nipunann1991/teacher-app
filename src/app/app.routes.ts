import { Injectable } from '@angular/core';
import { Routes} from '@angular/router';

import { HomePageComponent } from './frontend/home-page/home-page.component';
import { TeachersComponent } from './frontend/teachers/teachers.component';
import { FrontendComponent } from './frontend/frontend.component';
import { ViewTeachersComponent } from './frontend/teachers/view-teachers/view-teachers.component';
import { CreateTeacherComponent } from './frontend/teachers/create-teacher/create-teacher.component';



export const AppRoutes: Routes = [

	 
	{ path: '',
		component: FrontendComponent,
		children: [

			{ path: '',
				component: HomePageComponent
			},  
			
			{ path: 'teachers',
				component: TeachersComponent, 
			},

			{ path: 'teachers/view-teacher/:id',
				component: ViewTeachersComponent
			},

			{ path: 'teachers/create-teacher',
				component: CreateTeacherComponent
			},

		]
	}, 
	  
	


];
