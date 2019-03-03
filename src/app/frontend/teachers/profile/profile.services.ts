import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClientModule, HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'; 
import { ActivatedRoute } from "@angular/router";


@Injectable({
  providedIn: 'root'
})

export class DataService {  
  
  baseUrl = environment.baseUrl+'TeacherController';
  teachers: any ; routParam: any; teachers_id: any ; teachers_status: any ;

  constructor(private route: ActivatedRoute, public httpClient: HttpClient) { 

  } 

   ngOnInit() {

  	this.routParam = this.route.snapshot.paramMap.get("id");  
  	 
  }

 



	 

 
}