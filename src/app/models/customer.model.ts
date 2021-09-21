
export class CustomerModel {

    senderCustomerData:any;
    receiverCustomerData:any;

    constructor(){

        this.senderCustomerData ={
            accountHolderName: "",
            clearBalance: 0,
            senderBIC:"",
            customerAddress: "",
            customerCity: "",
            customerId: "",
            customerType: "",
            overDraftFlag: 0,
            userName: "",
            userPassword: ""
        }
        this.receiverCustomerData = this.senderCustomerData;
    }

}