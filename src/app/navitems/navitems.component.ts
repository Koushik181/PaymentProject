import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navitems',
  templateUrl: './navitems.component.html',
  styleUrls: ['./navitems.component.css']
})
export class NavitemsComponent implements OnInit {

  navitems:Array<any>;
  constructor(){
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
            text:'CotactUs',
            link:'contactus'
        }
      ]
  }
  ngOnInit(): void {
  }
}