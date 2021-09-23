
import { HttpClient } from "@angular/common/http";
import { Route } from "@angular/compiler/src/core";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })
export class AuthService {
    custid:any;
    customerData:any;

    constructor(private http:HttpClient, private router : Router){
    }

    verifyLoggedIn(){
        return !!localStorage.getItem('jwt') && !!localStorage.getItem('custid');
    }

    logout(){
        localStorage.removeItem('jwt');
        localStorage.removeItem('custid');
        localStorage.removeItem('messagecode');
        this.router.navigate(['/login']);
    }

    getCustomerData(){
        let url = 'http://localhost:8080/customerData';
    
    let payLoad = {
      'customerId':localStorage.getItem('custid')
    }
   this.postApi(url,payLoad).subscribe((result :any) => {
    console.log(result);

      this.customerData = result;

      }, err => {
        console.log("ERROR");
        console.log(err);
      });

      return this.customerData;
    }

    getJWTToken(){
        return localStorage.getItem('jwt');
    }

    getUserDetail(){
        return localStorage.getItem('custid');
    }

    postApi(url:string,payload:any){
        return this.http.post(url,payload);
    }
  
    postStringApi(url:string,payload:any){
        return this.http.post(url,payload, {responseType: 'text'});
    }

    getDataFromApi(url:string){
        return this.http.get(url);
    }

}