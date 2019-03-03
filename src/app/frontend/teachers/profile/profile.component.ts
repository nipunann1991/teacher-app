import { Component, OnInit } from '@angular/core'; 
import { DataService } from './profile.services';
import { HttpClientModule, HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
 
	routParam: any; teacher_id: any;   teacher_data: any; teacher_status: any;

  constructor(private route: ActivatedRoute, public httpClient: HttpClient, private dataservice: DataService) { }

  ngOnInit() {

  	this.routParam = this.route.snapshot.paramMap.get("id"); 
  	this.getTeacherID();
  }


  	getTeacherID() { 

      const params = new HttpParams({
         fromObject : {'log_id': this.routParam }
      });


       
        let promise = new Promise((resolve, reject) => {

          let apiURL =  this.dataservice.baseUrl+ '/getIndivudualTeacher';
          
          this.httpClient.post(apiURL, params)
            .toPromise()
            .then(
            res => { 

              let data : any = res;
            
            if (data.status == 200) { 

              if (data.data.length > 0) { 

              	let siteDate = localStorage.getItem('sitedata');
              	let siteDataObj = JSON.parse(siteDate);

              	siteDataObj['tid'] = data.data[0].teacher_id; 
              	siteDataObj['route_param_id'] = this.routParam; 

              	 
              	localStorage.setItem('sitedata', JSON.stringify(siteDataObj) );

                this.teacher_id = data.data[0].teacher_id;
                this.teacher_data =  data.data[0];
                this.teacher_status = data.data[0].status;
                console.log(this.teacher_data)

                  
              }


            }else{ 
               
            }

            resolve();
        });

      });

      return promise;

    }

}
