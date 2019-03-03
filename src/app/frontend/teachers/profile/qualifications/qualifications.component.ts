import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router"; 
import { DataService } from '../profile.services';
import { ProfileComponent } from '../profile.component';

import { HttpClientModule, HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'; 

@Component({
  selector: 'app-qualifications',
  templateUrl: './qualifications.component.html',
  styleUrls: ['./qualifications.component.scss']
})
export class QualificationsComponent implements OnInit {

  qualificationForm: FormGroup; x: any = 0; routParam
  submitted = false; nextStat = false; teacher_id: any; exp_data: any = []; teacher_status:any;

 constructor(private formBuilder: FormBuilder, private dataservice: DataService, private route: ActivatedRoute, public httpClient: HttpClient, private profileComp: ProfileComponent, private router: Router) { }

 ngOnInit() {
 
    

    this.qualificationForm = this.formBuilder.group({
       ex_title: ['', Validators.required],
       desc: [''],  
    });

    this.teacher_id = JSON.parse(localStorage.getItem('sitedata')).tid; 
    this.routParam = JSON.parse(localStorage.getItem('sitedata')).route_param_id;    
    this.getTeacherQualification();


 }


   get f() {
     
     return this.qualificationForm.controls; 

   }


  onSubmit() {
       this.submitted = true;

       if (this.qualificationForm.invalid) {
           return;
       }else{
         this.exp_data.reverse()
         this.exp_data.push(this.qualificationForm.value);  
         this.updateValues(); 

       } 
       
   } 


   updateValues(){
      let objVal; 
      objVal = { 'qualifications':  JSON.stringify(this.exp_data).replace(/'/g, '&#39;') , 'teacher_id': this.teacher_id }  
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
                    console.log(res1)
                    this.qualificationForm.reset();   
                    this.submitted = false; 

                    if(this.nextStat){ 
                      this.router.navigate(['/profile/'+this.routParam+'/experience']); 
                    }else{
                      this.getTeacherQualification(); 
                    }
                    
 
                 
                 }else{ 
                    console.log(res1)
                
                 }

               resolve();
           });

       });

         return promise;

   }



   getTeacherQualification() { 

       const params = new HttpParams({
          fromObject : {'teacher_id': this.teacher_id }
       });


      
       let promise = new Promise((resolve, reject) => {

         let apiURL =  this.dataservice.baseUrl+ '/getTeacherQualification';
         
         this.dataservice.httpClient.post(apiURL, params)
           .toPromise()
           .then(
           res => { 

             let data : any = res;
           
           if (data.status == 200) { 

              if (data.data[0].qualifications.length > 0) { 
                this.teacher_status = data.data[0].status;
                this.exp_data = JSON.parse(data.data[0].qualifications.replace(/&#39;/g, "'"));    
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
      
      let objVal = { 'status':  2 , 'teacher_id': this.teacher_id } 
      this.nextStat = true; 
      this.updateTeacher(objVal);
   }

}
