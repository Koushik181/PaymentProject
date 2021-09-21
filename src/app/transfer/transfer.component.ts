import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankModel } from '../models/bank.model';
import { CustomerModel } from '../models/customer.model';
import { TransferTypeModel } from '../models/transfer.type';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  receiverBIC : any;
  receiverAccountHolderName: any;
  receiverAccountHolderNumber: any;
  bicapiResult : any;
  accountNameApiResult:any;
  accountNumberApiResult : any;
  bankData : any;
  messageselectedValue:any;
  amountTransfer:number;
  finalAmount:number;
  trasnfertypecode:any;
  transferTypes: any;
  transferTypeValue : any;

  transferTypesList:Array<any>;

  transferTypesDropdownSchema:any;

  options= [
    "CHQB - Beneficiary customer must be paid by cheque only. ",
    "CORT - Payment is made in settlement for a trade.",
    "HOLD - Beneficiary customer or claimant will call upon identification.",
    "INTC - Payment between two companies that belongs to the same group.",
    "BHOB - Please advise the intermediary institution by phone.",
    "PHOI - Please advise the intermediary by phone.",
    "PHON - Please advise the account with institution by phone.",
    "REPA - Payments has a related e-Payments reference.",
    "SDVA - Payment must be executed with same day value to the"
  ]
  constructor
  (private authService:AuthService,
    
    private transferTypeModel: TransferTypeModel, private customerModel: CustomerModel, private bankModel : BankModel, private dataservice : DataService, private router : Router) { 
   
    //console.log(this.dataservice.transferTypes);
   
    this.amountTransfer = 0;
    this.finalAmount = 0;
   
    this.transferTypesList = [{name:"SampleDesc1",code:"SampleCode1"},{name:"SampleDesc2",code:"SampleCode2"}];
 
  }

  ngOnInit(): void {
      this.dataservice.getDataFromApi('http://localhost:8080/transfer')
      .subscribe((result:any)=>{

        console.log("here enteredd")
        this.transferTypesList = result.map((item:any)=>{
          return {name:item.transferTypeDescription,key:item.transferTypeCode};
        });
        console.log(this.transferTypesList)
        this.transferTypesDropdownSchema = {
          labelName:"TransferTypes",
          selectedValue:"",
          controlName:"trasfertypes",
          options:this.transferTypesList,
          defaultLabel:"Select TrasnferTypes"
        }

        console.log(this.transferTypesDropdownSchema)
  
      },err=>{
        console.log(err);
      });
  
    

    this.bicapiResult={
      success:false,
      error:false
    }
    this.accountNameApiResult ={
      success:false,
      error:false
    }
    this.accountNumberApiResult ={
      success:false,
      error:false
    }
    console.log("testing now againa "+this.transferTypesDropdownSchema)
  }

  validateAmount(){

    console.log(this.messageselectedValue);
    this.dataservice.setMessageCode(this.messageselectedValue);
    console.log(this.dataservice.messageSelected);
    console.log("finalAmount1"+this.finalAmount);
    console.log("finalAmount1.1"+this.amountTransfer);

    this.finalAmount = this.amountTransfer + this.amountTransfer*0.25 ;

    console.log("finalAmount2"+this.finalAmount);
  }

  handleTransferTypes(){
      let transferTypesUrl ="http://localhost:8080/transfer";

      this.dataservice.getDataFromApi(transferTypesUrl).subscribe((result :any) => {
        console.log(result);
       // for(let i=0;i<result.length ;i++){  //How to properly iterate here!!
       //   }

          this.transferTypeModel.transferType = result;
          this.transferTypes = this.transferTypeModel.transferType;
          console.log("hiii"+this.transferTypeModel.transferType);
        console.log("hereeee"+this.transferTypeModel.transferType[1].transferTypeCode)
        console.log("hereeee2"+this.transferTypeModel.transferType[1].transferTypeDescription)
        
      }, err => {
        console.log("Couldn't load transfertypes from backend, due to unexpected error");
      });

      console.log("Testing :"+ this.transferTypeModel.transferType[0].transferTypeCode);
      return this.transferTypes;
    

  }
  handleDropdownChange(){
    console.log("handleDropdownChange"+this.transferTypesDropdownSchema.selectedValue)
  }
  transferTypesSelected(data:any){
    console.log("data"+data);
    this.transferTypeValue=data;
  }
  handleReceiverBIC(){

    
    let url='http://localhost:8080/getBankNameFromBIC'

    let payLoad = {
      "bic": this.receiverBIC
    }

    this.dataservice.postApi(url, payLoad).subscribe((result :any) => {

      console.log(result);

      this.bankModel.bankData = result;
      this.bankData = this.bankModel.bankData;
      console.log("SUCCESSS");
      
      this.bicapiResult.success=true;
      this.bicapiResult.error =false;
      console.log(this.bicapiResult);

    }, err => {
      console.log("ERROR");
      this.bicapiResult.success=false;
      this.bicapiResult.error =true;
      console.log(this.bicapiResult);
    });

    console.log(this.bankData);

  }

  validateReceiverAccountHolderName(){
    let url='http://localhost:8080/verifyAccountName'

    console.log("Entered validateReceiverAccountHolderName")
    console.log(this.receiverAccountHolderName)

    let payLoad = {
      "accountHolderName": this.receiverAccountHolderName
    }

    this.dataservice.postStringApi(url, payLoad).subscribe((result :any) => {

      console.log(result);
      console.log("SUCCESSS");
      
      this.accountNameApiResult.success=true;
      this.accountNameApiResult.error =false;
      console.log(this.accountNameApiResult);

    }, err => {
      console.log(err);

      console.log("ERROR");
      this.accountNameApiResult.success=false;
      this.accountNameApiResult.error =true;
      console.log(this.accountNameApiResult);
    });

    console.log(this.receiverBIC);

  }

  
  validateReceiverAccountHolderNumber1(){
    let url='http://localhost:8080/validateAccountHolderNumber'


    let payLoad = {
      "customerId": this.receiverAccountHolderNumber,
      "userName":localStorage.getItem("custid")
    }

    //here this has to change from customermodel to getapi


    this.dataservice.postApi(url, payLoad).subscribe((result :any) => {
      console.log("SUCCESSS");
      console.log(result);
      
      this.customerModel.receiverCustomerData = result;

      console.log(this.customerModel.receiverCustomerData.customerType)

      if(this.customerModel.receiverCustomerData.customerType=='I'){
        this.trasnfertypecode = "Customer Transfer";
      }else{
        this.trasnfertypecode = "Bank Transfer for Own Account";
      }
      this.accountNumberApiResult.success=true;
      this.accountNumberApiResult.error =false;
      console.log(this.accountNumberApiResult);

    }, err => {
      console.log("ERROR");
      this.accountNumberApiResult.success=false;
      this.accountNumberApiResult.error =true;
      console.log(this.accountNumberApiResult);
    });

    console.log(this.receiverBIC);


    
    }


  validateReceiverAccountHolderNumber(){
    let url='http://localhost:8080/validateAccountHolderNumber'


    let payLoad = {
      "customerId": this.receiverAccountHolderNumber,
      "customerType" : this.customerModel.senderCustomerData.customerType
    }

    //here this has to change from customermodel to getapi


    this.dataservice.postApi(url, payLoad).subscribe((result :any) => {
      console.log("SUCCESSS");
      console.log(result);
      
      this.customerModel.receiverCustomerData = result;

      console.log(this.customerModel.receiverCustomerData.customerType)

      if(this.customerModel.receiverCustomerData.customerType=='I'){
        this.trasnfertypecode = "Customer Transfer";
      }else{
        this.trasnfertypecode = "Bank Transfer for Own Account";
      }
      this.accountNumberApiResult.success=true;
      this.accountNumberApiResult.error =false;
      console.log(this.accountNumberApiResult);

    }, err => {
      console.log("ERROR");
      this.accountNumberApiResult.success=false;
      this.accountNumberApiResult.error =true;
      console.log(this.accountNumberApiResult);
    });

    console.log(this.receiverBIC);

  }
  handleTransaction()
  {

    let url='http://localhost:8080/validateTransaction'

    console.log("Entered herer");
    let payLoad = {
      "customerId": this.customerModel.senderCustomerData.customerId,
      "userName" : this.customerModel.receiverCustomerData.customerId,
      "clearBalance": this.finalAmount
    }

    this.dataservice.postStringApi(url, payLoad).subscribe((result :any) => {
      console.log("SUCCESSS");
      console.log(result);
     

    }, err => {
      console.log("ERROR");
      window.alert("Transaction cannot be processed as sender dont have sufficient funds")
     
    });

    console.log(this.receiverBIC);

    
  this.router.navigate(['/transactionsuccess']);

  }
  handleDashboard(){
    this.router.navigate(['/dashboard']);
  }

  handleLogout(){
    this.router.navigate(['/login']);
  }
}
