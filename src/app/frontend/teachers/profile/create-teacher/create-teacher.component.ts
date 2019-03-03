import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router"; 
import { CustomValidator } from './validation';
import { DataService } from '../profile.services';
import { HttpClientModule, HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'; 
 



@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.scss']
})
export class CreateTeacherComponent implements OnInit {

	  registerForm: FormGroup;
    submitted = false; disabledArea = true;
    exampleData; options; 
    selectedSubjects; 
    teachers; teacher_id: any; teacher_status: any; 
    routParam: any;


  	constructor(private formBuilder: FormBuilder, private dataservice: DataService, private route: ActivatedRoute, public httpClient: HttpClient, private router: Router) { }

  	ngOnInit() {

        this.routParam = JSON.parse(localStorage.getItem('sitedata')).route_param_id;    

         this.registerForm = this.formBuilder.group({
              name: ['', Validators.required],
              nic: ['', Validators.required],
              address: ['', Validators.required],
              email_addr: ['', [Validators.required, Validators.email]],  
              skype: [''],  
              contact_no: ['', [Validators.required, CustomValidator.phoneValidator]],
               
          });

        this.getProfileDetails()
 
  	}



    get f() { 
    	return this.registerForm.controls; 

    }


    getProfileDetails() { 

      const params = new HttpParams({
         fromObject : {'log_id': this.routParam }
      });


       
        let promise = new Promise((resolve, reject) => {

          let apiURL =  this.dataservice.baseUrl+ '/getIndivudualTeacher';
          
          this.dataservice.httpClient.post(apiURL, params)
            .toPromise()
            .then(
            res => { 

              let data : any = res;
            
            if (data.status == 200) { 

              if (data.data.length > 0) { 

                this.teachers = data.data[0];  
                this.teacher_status = data.data[0].status;

                this.registerForm = this.formBuilder.group({
                  name: [this.teachers.name, Validators.required],
                  nic: [this.teachers.nic, Validators.required],
                  address: [this.teachers.address, Validators.required],
                  email_addr: [this.teachers.email_addr, [Validators.required, Validators.email]],  
                  skype: [this.teachers.skype],  
                  contact_no: [this.teachers.contact_no, [Validators.required, CustomValidator.phoneValidator]],
                   
                });

                this.teacher_id = this.teachers.teacher_id;



                
              }


            }else{ 
               
            }

            resolve();
        });

      });

      return promise;

    }
 

   
    onSubmit() {
        this.submitted = true;
 
        if (this.registerForm.invalid) {
            return;
        }else{

          let objVal = this.registerForm.value;
          objVal['teacher_id'] = this.teacher_id;

          if(this.teacher_status < 4){
            objVal['status'] = 1;
          }
           
          this.updateTeacher(objVal);
        } 
        
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
                     console.log(res1)

                    if(this.teacher_status < 4){
                      this.router.navigate(['/profile/'+this.routParam+'/qualifications']);  
                    }
                     
                  
                  }else{ 
                     console.log(res1)
                 
                  }

                resolve();
            });

          });

          return promise;

       }

}
