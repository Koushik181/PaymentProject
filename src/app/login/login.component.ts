import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm :FormGroup;
  apiResult:any;
  constructor(private router : Router) {

    this.loginForm = new FormGroup({

      //default value : koushik if provided as first parameter in new FormControl
      username: new FormControl('',[Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
        Validators.pattern(/^[a-z0-9]+$/i)
      ])
      ,

      password: new FormControl('',[Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
        Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/)
      ] )
    });

   }

   handleLogin(){

    //for usernamae console.log(this.loginForm.controls['username'].value)
    // to obtain all the details of username console.log(this.loginForm.controls);

    console.log(this.loginForm.controls['username'].value)
    console.log(this.loginForm.controls['password'].value)
  
     // let url = 'http://51.81.71.198:3000/api/members/login'

     let url='urlneedtobefinalized'
      let payLoad = {
        "USERNAME": this.loginForm.controls['username'].value,
        "PASSWORD": this.loginForm.controls['password'].value
      }
      console.log(payLoad);
      
      //added USERNAME AND PASSWORD TO PAYLOADS
    
      //BELOW CONDITIONS WILL BE VERIFIED ONCE THE RESULT IS OBTAINED FROM THE URL
      // AND SUCCESS/FAILURE LOGIN IS DETERMINED
      /*
        console.log("SUCCESSS");
        
        this.apiResult.success=true;
        this.apiResult.error =false;
        console.log(this.apiResult);
     
        console.log("ERRORO");
        
        this.apiResult.success=false;
        this.apiResult.error =true;
        console.log(this.apiResult);
        */

        this.router.navigate(['/dashboard'])

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
   }