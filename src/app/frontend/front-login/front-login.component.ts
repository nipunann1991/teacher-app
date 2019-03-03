import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClientModule, HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'; 
import { Router, NavigationEnd } from '@angular/router';

import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular-6-social-login';


@Component({
  selector: 'app-front-login',
  templateUrl: './front-login.component.html',
  styleUrls: ['./front-login.component.scss']
})
export class FrontLoginComponent implements OnInit {

	log_id: any = []; token: any;

  	constructor(private socialAuthService: AuthService, public httpClient: HttpClient, private router: Router) { }

	ngOnInit() {
	 	

	}


 


  	socialSignIn(socialPlatform : string) {

  		return new Promise((resolve, reject) => {

	    let socialPlatformProvider;

	    if(socialPlatform == "facebook"){
	      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
	    }else if(socialPlatform == "google"){
	      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
	    }   
	 		this.socialAuthService.signIn(socialPlatformProvider)  
		    .then( userData => {  
		        resolve(userData)  
		    }); 

	  	}).then(
		    (val) => {
		      console.log(val);

		      this.checkLoginPrev(val);
		      return 'done2';
		    },
		    (err) => console.error(err)
		  );
 
 	}

 	
 	checkLoginPrev(data: any){

 		this.token = {
  			token: data.token,
  			provider: data.provider 
  		};

 		localStorage.clear(); 

 		const params = new HttpParams({
	       fromObject : {'log_id': data.provider.charAt(0)+data.id}
	    });

 		let promise = new Promise((resolve, reject) => {

	        let apiURL =  environment.baseUrl+"LoginController/checkLoginData";
	        this.httpClient.post(apiURL, params)
	          .toPromise()
	          .then( res => { 

	            let res1 : any = res;
	          
	          	if (res1.status == 200) { 

		          	if (res1.data.length > 0) { 
	 				
		          		console.log("data exist !!!", res1.data);

		          		let objData = {
		          			user_id: data.provider.charAt(0)+data.id ,
		          			token: data.token
						  } 
						
						
						localStorage.setItem('sitedata', JSON.stringify(this.token));

						if(res1.data[0].status == 0){
							window.location.href = '/profile/'+objData.user_id+'/create-teacher'

						}else if(res1.data[0].status == 1){
							window.location.href = '/profile/'+objData.user_id+'/qualifications'
							
						}else if(res1.data[0].status == 2){
							window.location.href = '/profile/'+objData.user_id+'/experience'
						}else{
							window.location.href = '/profile/'+objData.user_id+'/my-profile'
						}

		          		// this.updateUserTokenFile(objData); 

		          		
		          		//window.location.href = '/profile/'+objData.user_id+'/create-teacher'
		          		
		          		
 

		          	}else{

		          		console.log("data nnot exist !!!");
		          		this.createProfile(data);   

		          	}

		        }else{ 
 
		        }

	          resolve();
	      });

	    });

	    return promise;
 	}


 	createProfile(data) : any{


 		const params = new HttpParams({
	       fromObject : {
	       		name: data.name,
	       		email_addr: data.email,
	       		log_id: data.provider.charAt(0)+data.id 
	   		}
	    });

 		let promise = new Promise((resolve, reject) => {

	        let apiURL =  environment.baseUrl+"LoginController/createProfile";
	        this.httpClient.post(apiURL, params)
	          .toPromise()
	          .then( res => { 

	            let res1 : any = res;
	          
	          	if (res1.status == 200) { 

	          		let objData = {
	          			user_id: data.provider.charAt(0)+data.id ,
	          			token: this.token.token
	          		}

	          		//this.createUserTokenFile(objData);

		          	localStorage.setItem('sitedata', JSON.stringify(this.token));
		          	window.location.href = '/profile/'+objData.user_id+'/create-teacher';

 

		        }else{ 
		           console.log(res1)
 					
		        }

	          resolve();
	      });

	    });

	    return promise;

 	}


 	createUserTokenFile(data) : any{


 		const params = new HttpParams({
	       fromObject : data
	    });

 		let promise = new Promise((resolve, reject) => {

	        let apiURL =  environment.baseUrl+"LoginController/createUserToken";
	        this.httpClient.post(apiURL, params)
	          .toPromise()
	          .then( res => { 

	            let res1 : any = res;
	          
	          	if (res1.status == 200) { 
		            console.log(res1)

		          	window.location.href = '/profile/'+data.user_id+'/create-teacher';


		          
		        }else{ 
		           console.log(res1)
 					
		        }

	          resolve();
	      });

	    });

	    return promise;

 	}


 	updateUserTokenFile(data) : any{


 		const params = new HttpParams({
	       fromObject : data
	    });

 		let promise = new Promise((resolve, reject) => {

	        let apiURL =  environment.baseUrl+"LoginController/updateUserToken";
	        this.httpClient.post(apiURL, params)
	          .toPromise()
	          .then( res => { 

	            let res1 : any = res;
	          
	          	if (res1.status == 200) { 

	          		
	          		this.setSession(data); 
		          
		        }else{ 
		           console.log(res1)
 					
		        }

	          resolve();
	      });

	    });

	    return promise;

 	}

 	setSession(data) : any{


 		const params = new HttpParams({
	       fromObject : data
	    });

 		let promise = new Promise((resolve, reject) => {

	        let apiURL =  environment.baseUrl+"LoginController/setSessionToken";
	        this.httpClient.post(apiURL, params)
	          .toPromise()
	          .then( res => { 

	            	localStorage.setItem('sitedata', JSON.stringify(this.token));
		          	window.location.href = '/profile/'+data.user_id+'/create-teacher';
		           

	          	resolve();
	      	});

	    });

	    return promise;

 	}



 	getSessionToken() : any{



 		let promise = new Promise((resolve, reject) => {

	        let apiURL =  environment.baseUrl+"LoginController/getSessionToken";
	        this.httpClient.post(apiURL, '')
	          .toPromise()
	          .then( res => { 

	          		console.log(res);

	          	resolve();
	      	});

	    });

	    return promise;

 	}

 

//https://graph.facebook.com/v3.2/{person-id}/


}
