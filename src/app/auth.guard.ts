import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from '../environments/environment'; 
import { HttpClientModule, HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'; 

declare var jquery:any;
declare var $ :any;

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

	constructor(private router: Router, private activated_route: ActivatedRoute, public httpClient: HttpClient) { 
   
  }

	sitedata: any = localStorage.getItem('sitedata');
  isAdmin : boolean= false;


  ngOnInit() {

     
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
     let url = state.url; 
  
    if (localStorage.getItem('sitedata') == null) { 

         if (url == '/login' ) {
           return true;

         }else{
            this.router.navigate(['/login']); 
            return false;
         }

        
    }else{ 

        let token = JSON.parse(this.sitedata).token;
        let provider = JSON.parse(this.sitedata).provider;

        this.verifyUser(JSON.parse(this.sitedata)); 

       // if (url == '/login' ) { 
       //   this.router.navigate(['/profile/g101780267759212434309/create-teacher']);  
       // }
       
      return true;

    } 
   
  }
  

  canActivateChild() {
    console.log('checking child route access');
    return true;
  }


  isDashboard(){

    if (this.sitedata) {  
       return true;

    }else{ 
      return false;
      
    }
    
  }


  verifyUser(sitedata){
 
   let serviceURL; 

    if (sitedata.provider == 'google') {
       serviceURL = 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token='+sitedata.token
    }else{

    }
 
      let promise = new Promise((resolve, reject) => {
 
          this.httpClient.get(serviceURL)
            .toPromise()
            .then(
            res => { 

              let data : any = res;
            
               console.log(data);
               this.checkLoginPrev(sitedata.provider, data.user_id);

            resolve();
        }).catch( err => { 

          console.log(err);
        });

      });

      return promise;
   
  }


    checkLoginPrev(provider, id){ 


     const params = new HttpParams({
         fromObject : {'log_id': provider.charAt(0)+id}
      });

     let promise = new Promise((resolve, reject) => {

          let apiURL =  environment.baseUrl+"/LoginController/checkLoginData";
          this.httpClient.post(apiURL, params)
            .toPromise()
            .then( res => { 

              let res1 : any = res;
            
              if (res1.status == 200) { 

                if (res1.data.length > 0) { 
           
                  console.log("valid User !!!");  
                  //this.router.navigate(['/profile/g101780267759212434309/create-teacher']);  
                  //$('.login-button').css({ 'display': 'none'});

                }else{

                  console.log("Invalid User !!!");  

                }

            }else{ 
 
            }

            resolve();
        });

      });

      return promise;
   }

  
 

}