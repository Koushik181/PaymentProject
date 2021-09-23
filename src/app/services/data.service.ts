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

          this.transferTypeModel.transferType = result;
        
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