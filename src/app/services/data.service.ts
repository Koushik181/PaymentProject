import { HttpClient, HttpHeaders } from "@angular/common/http";
import { analyzeAndValidateNgModules, ConditionalExpr } from "@angular/compiler";
import { Injectable, OnInit } from "@angular/core";
import { TransferTypeModel } from "../models/transfer.type";

@Injectable()
export class DataService {

    transferTypes:any;
    messageSelected: string;
    constructor(private transferTypeModel : TransferTypeModel, private http:HttpClient){
     
      this.messageSelected='';
   //  console.log(this.transferTypes);
    }

    setMessageCode(data : string){

      this.messageSelected = data; 
    }

    getTransferTypes(){
      let transferTypesUrl ="http://localhost:8080/transfer";

      this.getDataFromApi(transferTypesUrl).subscribe((result :any) => {
        console.log(result);
       // for(let i=0;i<result.length ;i++){  //How to properly iterate here!!
       //   }

          this.transferTypeModel.transferType = result;
          
          console.log("hiii"+this.transferTypeModel.transferType);
        console.log("hereeee"+this.transferTypeModel.transferType.transferTypeCode)
        console.log("hereeee2"+this.transferTypeModel.transferType.transferTypeDescription)
        
      }, err => {
        console.log("Couldn't load transfertypes from backend, due to unexpected error");
      });

      console.log("Testing :"+ this.transferTypes);
      return this.transferTypes;
    }

    postApi(url:string,payload:any){
      return this.http.post(url,payload);
    }

    postStringApi(url:string,payload:any){
      return this.http.post(url,payload, {responseType: 'text'});
    }
    
    getDataFromApi(url:string){
      return this.http.get(url);
    }

}
/*
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
<div class="container bootstrap snippets bootdey">
    <div class="row">
             
        <div class="profile-info col-md-9">
            <div class="panel">

                <footer class="panel-footer">
                    
                </footer>
            </div>
            <div class="panel">
                <div class="bio-graph-heading">
                    <h1>Customer Profile</h1>
                </div>
                <br>
                <div class="panel-body bio-graph-info">
                    <div class="row">
                        <div class="bio-row">
                            <p><span><b>Customer ID</b></span>: {{customerData.customerId}}</p>
                        </div>
                        <div class="bio-row">
                            <p><span><b>Name</b></span>: {{customerData.accountHolderName}}</p>
                        </div>
                        <div class="bio-row">
                            <p><span><b>Balance</b></span>:  {{customerData.clearBalance}}</p>
                        </div>
                        <div class="bio-row">
                            <p><span><b>City</b></span>:  {{customerData.customerCity}}</p>
                        </div>
                        <div class="bio-row">
                            <p><span><b>Type</b></span>:  {{customerType}}</p>
                        </div>
                        <div class="bio-row">
                            <p><span><b>OverDraft</b></span>: {{overDraft}}</p>
                        </div>
                        <div class="bio-row">
                            <p><span><b>BIC</b></span>:  {{customerData.senderBIC}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
*/

/*

headers={
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*'
    }
  
    requestOptions ={
      headers: new HttpHeaders(this.headers)
    }

    */
