import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transactionsuccess',
  templateUrl: './transactionsuccess.component.html',
  styleUrls: ['./transactionsuccess.component.css']
})
export class TransactionsuccessComponent implements OnInit {

  message : string;
  constructor(private dataservice:DataService,private router:Router) {
    this.message = this.dataservice.messageSelected;
    this.message = this.message.substring(7);
   }

  ngOnInit(): void {
  }
  handleDashboard(){
    this.router.navigate(['/dashboard']);
  }

  handleLogout(){
    this.router.navigate(['/login']);
  }

}
