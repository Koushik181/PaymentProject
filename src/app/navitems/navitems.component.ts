import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navitems',
  templateUrl: './navitems.component.html',
  styleUrls: ['./navitems.component.css']
})
export class NavitemsComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
   
  }

  loggedIn() {
    return this.authService.verifyLoggedIn()
  }
  logout() {
    this.authService.logout();
    this.router.navigate(["/home"])
  }
  ngOnInit(): void {
  }
}