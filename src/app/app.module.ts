import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AbstractControl, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { NavitemsComponent } from './navitems/navitems.component';
import { HeaderComponent } from './header/header.component';
import { TransferComponent } from './transfer/transfer.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { DataService } from './services/data.service';
import { CustomerModel } from './models/customer.model';
import { BankModel } from './models/bank.model';
import { JWTTokenService } from './services/jwt.token.service';
import { LocalStorageService } from './services/local.storage.service';
import { TransferTypeModel } from './models/transfer.type';
import { DropdownComponent } from './dropdown/dropdown.component';
import { NumbersOnlyDirective } from './commonDirectives/numbersonly.directive';
import { TransactionsuccessComponent } from './transactionsuccess/transactionsuccess.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './services/auth.service';
import { AuthorizeGuard } from './services/authguard.service';
import { TokenInterceptorService } from './services/token.interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavitemsComponent,
    HeaderComponent,
    TransferComponent,
    AboutusComponent,
    ContactusComponent,
    DropdownComponent,
    NumbersOnlyDirective,
    TransactionsuccessComponent,
    ThankyouComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path:"login",component:LoginComponent
      },
      {
        path:"dashboard",component:DashboardComponent
      },
      {
        path:"transfer",component:TransferComponent
      },
      {
        path:"home",component:HomeComponent
      },
      {
        path:"transactionsuccess",component:TransactionsuccessComponent
        },
        
        {
          path:"thankyou",component:ThankyouComponent
          },
      {
      path:"contactus",component:ContactusComponent
      },
      {
        path:"",component:HomeComponent
      }

    ])
  ],
  providers: [DataService,JWTTokenService,LocalStorageService,CustomerModel,BankModel,TransferTypeModel,AuthService
  ,AuthorizeGuard,
{
  provide: HTTP_INTERCEPTORS,
  useClass:TokenInterceptorService,
  multi:true
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
