import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navitems',
  templateUrl: './navitems.component.html',
  styleUrls: ['./navitems.component.css']
})
export class NavitemsComponent implements OnInit {

  navitems:Array<any>;
  constructor(private authService:AuthService, private router : Router){
      this.navitems=[

        {
          text:'Home',
          link:'home'
      },
          {
              text:'Login',
              link:'login'
          },

          {
            text:'Dashboard',
            link:'dashboard'
        },

        {
          text:'Transfer',
          link:'transfer'
      },
      
         
        {
            text:'CotactUs',
            link:'contactus'
        }
      ]
  }

  loggedIn(){
    return this.authService.verifyLoggedIn()
  }
  logout()
{
  this.authService.logout();
  this.router.navigate(["/home"])
}
  ngOnInit(): void {
  }
}