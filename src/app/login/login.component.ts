import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerModel } from '../models/customer.model';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm :FormGroup;
  apiResult:any;

  constructor(private authService: AuthService,private customerModel: CustomerModel ,private dataservice : DataService, private router : Router) {

    this.loginForm = new FormGroup({

      //default value : koushik if provided as first parameter in new FormControl
      username: new FormControl('',[Validators.required,
       // Validators.minLength(6),
        //Validators.maxLength(10),
        //Validators.pattern(/^[a-z0-9]+$/i)
      ])
      ,

      password: new FormControl('',[Validators.required,
       // Validators.minLength(6),
       // Validators.maxLength(15),
       // Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/)
      ] )
    });

   }

   handleLogin(){

    //for usernamae console.log(this.loginForm.controls['username'].value)
    // to obtain all the details of username console.log(this.loginForm.controls);

    console.log(this.loginForm.controls['username'].value)
    console.log(this.loginForm.controls['password'].value)
  
     // let url = 'http://51.81.71.198:3000/api/members/login'

     let url='http://localhost:8080/login'

      let payLoad = {
        "userName": this.loginForm.controls['username'].value,
        "userPassword": this.loginForm.controls['password'].value
      }
     // console.log(payLoad);
      
      //added USERNAME AND PASSWORD TO PAYLOADS
    
      //BELOW CONDITIONS WILL BE VERIFIED ONCE THE RESULT IS OBTAINED FROM THE URL
      // AND SUCCESS/FAILURE LOGIN IS DETERMINED)
        this.dataservice.postApi(url, payLoad).subscribe((result :any) => {
          /*
          accountHolderName: "A M MAYANNA"
          clearBalance: 221470
customerAddress: ""
customerCity: ""
customerId: "71319440983198"
customerType: "I"
overDraftFlag: 0
userName: "Mayanna"
userPassword: "mayanna"

          */
         console.log(this.customerModel.senderCustomerData);
          this.customerModel.senderCustomerData = result;
          console.log(this.customerModel.senderCustomerData);
          console.log("SUCCESSS");
          
          this.apiResult.success=true;
          this.apiResult.error =false;
          console.log(this.apiResult);
          sessionStorage.setItem('token',result.jwt);
          this.router.navigate(['/dashboard'])

        }, err => {
          console.log("ERROR");
          this.apiResult.success=false;
          this.apiResult.error =true;
          console.log(this.apiResult);
        });

      }

      handleLogin1(){

        //for usernamae console.log(this.loginForm.controls['username'].value)
        // to obtain all the details of username console.log(this.loginForm.controls);
    
        console.log(this.loginForm.controls['username'].value)
        console.log(this.loginForm.controls['password'].value)
      
         // let url = 'http://51.81.71.198:3000/api/members/login'
    
        // let url='http://localhost:8080/login'

        let url = 'http://localhost:8080/authenticate';
    
          let payLoad = {
            "username": this.loginForm.controls['username'].value,
            "password": this.loginForm.controls['password'].value
          }
          this.authService.postApi(url,payLoad).subscribe((result :any) => {
           

              console.log(result);

              localStorage.setItem('jwt',result.jwt);
              localStorage.setItem('custid',this.loginForm.controls['username'].value);

              console.log("SUCCESSS");

              this.dashboardFunction();
              
              this.apiResult.success=true;
              this.apiResult.error =false;
              console.log(this.apiResult);
              this.router.navigate(['/dashboard'])
    
            }, err => {
              console.log("ERROR");
              this.apiResult.success=false;
              this.apiResult.error =true;
              console.log(this.apiResult);
            });
    
          }
      get userName(){
        return this.loginForm.controls['username'];
      }
   
      get passWord(){
       return this.loginForm.controls['password'];
     }
     ngOnInit(): void {
       this.apiResult={
         success:false,
         error:false
       }
     }

     dashboardFunction(){
      let url = 'http://localhost:8080/customerData';
    
      let payLoad = {
        'customerId':localStorage.getItem('custid')
      }
      this.authService.postApi(url,payLoad).subscribe((result :any) => {
       
  
          console.log(result);
          this.customerModel.senderCustomerData = result;
         
  
        }, err => {
          console.log("ERROR");
          console.log(err);
        });
  
        
  
     }
   }