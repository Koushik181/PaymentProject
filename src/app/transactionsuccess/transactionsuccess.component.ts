import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transactionsuccess',
  templateUrl: './transactionsuccess.component.html',
  styleUrls: ['./transactionsuccess.component.css']
})
export class TransactionsuccessComponent implements OnInit {

 // message : string;
    message : any;
  constructor(private authService:AuthService,private dataservice:DataService,private router:Router) {
   // this.message = this.dataservice.messageSelected;
   // this.message = this.message.substring(7);

    this.message = localStorage.getItem('messagecode');
   }

  ngOnInit(): void {
  }
  handleDashboard(){
    this.router.navigate(['/dashboard']);
  }

  handleLogout(){
    this.authService.logout();
    this.router.navigate(["/home"])
  }

}
