import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
declare var jquery:any;
declare var $ :any;

@Injectable()
export class AnonymousGuard implements CanActivate, CanActivateChild {


	constructor(private router: Router) { 
    
  }

	token: any = sessionStorage.getItem('token');

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
     console.log('checking child route access');
    if (!this.token) {  
    	return true;

    }else{  
      //this.router.navigate(['dashboard']);  

      return false;

    }
   
  }
 

  canActivateChild() {
    console.log('checking child route access');
    return true;
  }


 

 

}