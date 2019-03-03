import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router"; 
import { DataService } from '../profile.services';
import { ProfileComponent } from '../profile.component';

import { HttpClientModule, HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'; 
 
@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

 	experienceForm: FormGroup; x: any = 0; routParam
 	submitted = false; nextStat = false; teacher_id: any; exp_data: any = [];  teacher_status:any;

  constructor(private formBuilder: FormBuilder, private dataservice: DataService, private route: ActivatedRoute, public httpClient: HttpClient, private profileComp: ProfileComponent, private router: Router) { }

  ngOnInit() {

  	this.experienceForm = this.formBuilder.group({
        ex_title: ['', Validators.required],
        desc: [''],  
    });

    this.teacher_id = JSON.parse(localStorage.getItem('sitedata')).tid;
    this.routParam = this.profileComp.routParam 

    this.getTeacherExperience();


  }


    get f() {
      
    	return this.experienceForm.controls; 

    }


   onSubmit() {
        this.submitted = true;
 
        if (this.experienceForm.invalid) {
            return;
        }else{
          this.exp_data.reverse()
        	this.exp_data.push(this.experienceForm.value);  
        	this.updateValues();
          
 
        } 
        
    } 


    updateValues(){
		    let objVal = { 'experience':  JSON.stringify(this.exp_data).replace(/'/g, '&#39;') , 'teacher_id': this.teacher_id }  
      	this.updateTeacher(objVal);
    }


    updateTeacher(data) : any{
 
        const params = new HttpParams({
            fromObject : data
        });

        let promise = new Promise((resolve, reject) => {

              let apiURL =  this.dataservice.baseUrl+"/updateTeacher";
              this.httpClient.post(apiURL, params)
                .toPromise()
                .then( res => { 

                  let res1 : any = res;
                
                  if (res1.status == 200) { 
                      
                     this.experienceForm.reset();   
                     this.submitted = false; 

                     if(this.nextStat){ 
                      this.router.navigate(['/profile/'+this.routParam+'/my-profile']); 
                    }else{
                      this.getTeacherExperience(); 
                    } 

                  
                  }else{ 
                     console.log(res1)
                 
                  }

                resolve();
            });

        });

          return promise;

    }



    getTeacherExperience() { 

      	const params = new HttpParams({
         	fromObject : {'teacher_id': this.teacher_id }
      	});
 
       
        let promise = new Promise((resolve, reject) => {

          let apiURL =  this.dataservice.baseUrl+ '/getTeacherExperience';
          
          this.dataservice.httpClient.post(apiURL, params)
            .toPromise()
            .then(
            res => { 

              let data : any = res;
            
            if (data.status == 200) { 

              	if (data.data[0].experience.length > 0) { 

                  this.teacher_status = data.data[0].status;
                  this.exp_data = JSON.parse(data.data[0].experience.replace(/&#39;/g, "'"));  
                   
              	}


            }else{ 
               
            }

            resolve();
        });

      });

      return promise;

    }

    removeExperience(index){ 
		  this.exp_data.splice(index, 1); 
		  this.updateValues(); 
    }

    nextItem(){ 

      let objVal = { 'status':  4 , 'teacher_id': this.teacher_id } 
      this.nextStat = true; 
      this.updateTeacher(objVal);

    }

}
