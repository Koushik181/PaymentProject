import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerModel } from '../models/customer.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  customerData: any;
  customerType: any;
  overDraft: any;
  constructor(private authService: AuthService, private customerModel: CustomerModel, private router: Router) {

    console.log("constructor")

  }

  ngOnInit(): void {

    let url = 'http://localhost:8080/customerData';

    let payLoad = {
      'customerId': localStorage.getItem('custid')
    }
    this.authService.postApi(url, payLoad).subscribe((result: any) => {



      console.log(result);

      this.customerData = result;

    }, err => {
      console.log("ERROR");
      console.log(err);
    });

    console.log("customer data" + this.customerData)
    if (this.customerData.customerType == 'I') {
      this.customerType = "Individual Customer";
    } else {
      this.customerType = "Bank";
    }
    if (this.customerData.overDraftFlag == 0) {
      this.overDraft = "Customer dont have overdraft facility";
    } else {
      this.overDraft = "Customer have overdraft facility";
    }

    console.log("ngoninit");
  }

  handleTransfer() {
    this.router.navigate(['/transfer'])
  }
  handleLogout() {

    this.authService.logout();
    this.router.navigate(["/home"])
  }

}
