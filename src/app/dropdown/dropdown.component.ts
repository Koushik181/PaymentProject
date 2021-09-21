import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  @Input()
  schema:any;

  //1.creating output decorator
  //this handleChange parameter is used in accepting the output value.
  @Output()
  handleChange:any;

  constructor() {

    console.log("Etered")
    this.schema = {
      options:[{key:"",name:""}],
      labelName:"",
      defaultLabel:"",
      cssClass:"",
      selectedValue:"",
      controlName:""
    }

    //2.initialization
  this.handleChange = new EventEmitter();

   }

  ngOnInit(): void {
  }

  //handle the dropdown change
  handleDropdownChange(){

    console.log("iam")

    //emit the dropdown selected value
    this.handleChange.emit(this.schema.selectedValue)
  }

}
