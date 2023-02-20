import { api, LightningElement, track } from 'lwc';
import fieldcancel from '@salesforce/resourceUrl/fieldcancel';
import fielddelete from '@salesforce/resourceUrl/fielddelete';
import fieldsave from '@salesforce/resourceUrl/fieldsave';
import fieldduplicate from '@salesforce/resourceUrl/fieldduplicate';
import deletefield from '@salesforce/apex/fieldvalidation.deletefield';
import savevalidation from '@salesforce/apex/fieldvalidation.savevalidation';
import getfieldvalidation from '@salesforce/apex/fieldvalidation.getfieldvalidation';

export default class FieldValidation extends LightningElement {
    mainbody = true;
    shorttextoptions = false;
    shorttextprefix = false;
    longtextoptions = false;
    dropdownchoices = false;
    numberoptions = false;
    numberprefix= false;
    emailoptions= true;
    priceoption = false;
    nameoptions = false;
    
    scaleratinghelptext= false;
    scaleratingoptions = false;
    termsofservice = false;
    editterms= false;
    linkoptions = false;

    formedit= false;
    pageedit= false;
    @api tab;
    @api fieldId;
    @api fieldName = '';
    d = true;
    @track labelvalue = '';
    @track helptext = '';
    @track placeholdervalue = '';
    @track prefixvalue ='';
    @track decimal;
    @track helptextcheck = false;
    @track labelcheck = true;
    @track isRequiredcheck = false;
    @track isdisabledcheck = false;
    @track placeholdercheck = false;
    @track readonlycheck = false
    @track prefixcheck = false;
    @track richtextinput = false;
    @track FieldValidation = [];
    @track Richtextvalue;
    @track minimumvalue = 0;
    @track maximumvalue = 128;
    @track salutation = [];
    @track salutationindex = 0;
    @track salutationvalue = [];


    fieldcancel = fieldcancel;
    fieldduplicate = fieldduplicate;
    fieldsave = fieldsave;
    fielddelete = fielddelete;

    connectedCallback(){
        this.fieldName = this.fieldName.slice(0, this.fieldName.indexOf(','));
        console.log(this.fieldName);
        this.isRequiredcheck = false;
        this.sdisabledcheck = false;
        getfieldvalidation({}).then(result =>{
            let o = JSON.parse(result);
            console.log(o +' ---------> o');
            console.log( result + '------- result');
        })
    }

    @api
    get field(){
        let mydata1 = {data:[{Name:this.fieldName}]};
        mydata1.data.forEach(element => {
            if (element.Name == 'QFPHONE') {element.QFPHONE = true} 
            else if(element.Name == 'QFFULLNAME') {element.QFFULLNAME = true}
            else if(element.Name == 'QFADDRESS') {element.QFADDRESS = true}
            else if(element.Name == 'QFNAME') {element.QFNAME = true}
            else if(element.Name == 'QFEMAILID') {element.QFEMAILID = true}
            else if(element.Name == 'QFNUMBER') {element.QFNUMBER = true}
            else if(element.Name == 'QFPRICE') {element.QFPRICE = true}
            else if(element.Name == 'QFRADIOBUTTON') {element.QFRADIOBUTTON = true}
            else if(element.Name == 'QFCHECKBOX') {element.QFCHECKBOX = true}
            else if(element.Name == 'QFRICHTEXT') {element.QFRICHTEXT = true}
            else if(element.Name == 'QFLONGTEXT') {element.QFLONGTEXT = true}
            else if(element.Name == 'QFSHORTTEXT') {element.QFSHORTTEXT = true}
            else if(element.Name == 'QFFILEUPLOAD') {element.QFFILEUPLOAD = true}
            else if(element.Name == 'QFTERMSOFSERVICE') {element.QFTERMSOFSERVICE = true}
            else if(element.Name == 'QFSIGNATURE') {element.QFSIGNATURE = true}
            else if(element.Name == 'QFLINK') {element.QFLINK = true}
            else if(element.Name == 'QFDATE') {element.QFDATE = true}
            else if(element.Name == 'QFTIME') {element.QFTIME = true}
            else if(element.Name == 'QFDATETIME') {element.QFDATETIME = true}
            else if(element.Name == 'QFRATING') {element.QFRATING = true}
            else if(element.Name == 'QFEMOJIRATING') {element.QFEMOJIRATING = true}
            else if(element.Name == 'QFSCALERATING') {element.QFSCALERATING = true}
        });
        return mydata1;
    }

    validatingbtnhandle(event){

        if(event.currentTarget.dataset.title == 'Close'){
            event.preventDefault();
            const selectEvent = new CustomEvent('closevalidation', {
                detail: this.tab
            });
            this.dispatchEvent(selectEvent);
        }
        else if(event.currentTarget.dataset.title == 'Delete'){
            deletefield({fieldId:this.fieldId})
            .then(result => {
                event.preventDefault();
                const selectEvent = new CustomEvent('closevalidation', {
                    detail: this.tab
                });
                this.dispatchEvent(selectEvent);
            })
            .catch(error => {
                console.log(error);
            });
        }
        else if(event.currentTarget.dataset.title == 'Save'){
            this.fieldValidation = [
                {"isRequired" : this.isRequiredcheck},
                {"isDisabled" : this.isdisabledcheck},
                {"isLabel" : this.labelcheck},
                {"isHelpText" : this.helptextcheck},
                {"Label" : this.labelvalue},
                {"HelpText" : this.helptext}
            ]
            if(event.currentTarget.dataset.name == "QFPHONE"){
                this.fieldValidation.push({"isPlaceholder" : this.placeholdercheck},
                                          {"Placeholder" : this.placeholdervalue},
                                          {"isReadonly" : this.readonlycheck})
            }
            else if(event.currentTarget.dataset.name == "QFADDRESS"){
                this.fieldValidation.push({"isReadonly" : this.readonlycheck})
            }
            else if( event.currentTarget.dataset.name == "QFNAME"){
                this.fieldValidation.push({"isPlaceholder" : this.placeholdercheck},
                                          {"Placeholder" : this.placeholdervalue},)
            }
            else if(event.currentTarget.dataset.name == "QFEMAILID"){
                this.fieldValidation.push({"isPlaceholder" : this.placeholdercheck},
                                          {"Placeholder" : this.placeholdervalue},
                                          {"isReadonly" : this.readonlycheck},
                                          {"Minimum" : this.minimumvalue},
                                          {"Maximum" : this.maximumvalue})
            }
            else if(event.currentTarget.dataset.name == "QFNUMBER"){
                this.fieldValidation.push({"isPlaceholder" : this.placeholdercheck},
                                            {"Placeholder" : this.placeholdervalue},
                                            {"isReadonly" : this.readonlycheck},
                                            {"isPrefix" : this.prefixcheck},
                                            {"Prefix" : this.prefixvalue})
            }
            else if(event.currentTarget.dataset.name == "QFFULLNAME"){
                this.fieldValidation.push({"Salutation" : this.salutation})
            }
            else if(event.currentTarget.dataset.name == "QFPRICE"){
                this.fieldValidation.push({"isPlaceholder" : this.placeholdercheck},
                                          {"Placeholder" : this.placeholdervalue},
                                          {"Decimal" : this.decimal})
            }
            else if(event.currentTarget.dataset.name == "QFLONGTEXT"){
                this.fieldValidation.push({"isPlaceholder" : this.placeholdercheck},
                {"Placeholder" : this.placeholdervalue},
                {"isReadonly" : this.readonlycheck})
            }
            else if(event.currentTarget.dataset.name == "QFRICHTEXT"){
                this.fieldValidation.push({"Richtext" : this.Richtextvalue},)
            }
            else if(event.currentTarget.dataset.name == "QFSHORTTEXT"){
                this.fieldValidation.push({"isPlaceholder" : this.placeholdercheck},
                                            {"Placeholder" : this.placeholdervalue},
                                            {"isReadonly" : this.readonlycheck},
                                            {"isPrefix" : this.prefixcheck},
                                            {"Prefix" : this.prefixvalue})
            }
            else if(event.currentTarget.dataset.name == "QFLINK"){
                this.fieldValidation.push({"isPlaceholder" : this.placeholdercheck},
                {"Placeholder" : this.placeholdervalue},
                {"isReadonly" : this.readonlycheck})
            }
            else if(event.currentTarget.dataset.name == "QFTERMSOFSERVICE"){
                this.fieldValidation.push({"Agreement" : this.Richtextvalue},)
            }
            else if(event.currentTarget.dataset.name == "QFTIME"){
                this.fieldValidation.push({"isReadonly" : this.readonlycheck})
            }
            else if(event.currentTarget.dataset.name == "QFDATETIME"){
                this.fieldValidation.push({"isReadonly" : this.readonlycheck})
            }
            else if(event.currentTarget.dataset.name == "QFDATE"){
                this.fieldValidation.push({"isReadonly" : this.readonlycheck})
            }
            else if(event.currentTarget.dataset.name == "QFRADIOBUTTON"){
                this.fieldValidation.push({"Salutation" : this.salutation})
            }
            else if(event.currentTarget.dataset.name == "QFCHECKBOX"){
                this.fieldValidation.push({"Salutation" : this.salutation})
            }


            console.log(JSON.stringify(this.fieldValidation));

            savevalidation({fieldId:this.fieldId, fieldValidation:JSON.stringify(this.fieldValidation)})
            .then(result => {
                event.preventDefault();
                const selectEvent = new CustomEvent('closevalidation', {
                    detail: this.tab
                });
                this.dispatchEvent(selectEvent);
            })
            .catch(error => {
                console.log(error);
            });
           
        }
    }

    get showlabel() {
        return [
            { label: 'Show', value: 'Show' },
            { label: 'Hide', value: 'Hide' },
        
        ];
    }
    get showdecimal(){
        return [
            { label: '0', value: '0' },
            { label: '0.00', value: '0.00' },
            { label: '0.000', value: '0.000' },
            { label: '0.0000', value: '0.0000' },
        ];
    }

    validatingvalue(event){
        if(event.currentTarget.dataset.title == 'Label'){
        this.labelvalue = event.detail.value;
        }
        else if(event.currentTarget.dataset.title == 'HelpText'){
            this.helptext = event.detail.value;
        }
        else if(event.currentTarget.dataset.title == 'PlaceHolder'){
            this.placeholdervalue = event.detail.value;
        }
        else if(event.currentTarget.dataset.title == 'Prefix'){
            this.prefixvalue = event.detail.value;
        }
    }

    handlevalidation(event){
        if(event.currentTarget.dataset.title == 'Label'){
            if(event.detail.value == 'Show'){
                this.labelcheck = true;
            }
            else{
                this.labelcheck = false;
            }
        }
        else if(event.currentTarget.dataset.title == 'HelpText'){
            if(event.detail.value == 'Show'){
                this.helptextcheck = true;
            }
            else{
                this.helptextcheck = false;
            }        
        }
        else if(event.currentTarget.dataset.title == 'PlaceHolder'){
                this.placeholdercheck = event.target.checked;
                console.log(this.placeholdercheck);  
        }
        else if(event.currentTarget.dataset.title == 'ReadOnly'){
            this.readonlycheck = event.target.checked;
            console.log(this.readonlycheck);  
        }
        else if(event.currentTarget.dataset.title == 'Prefix'){
            this.prefixcheck = event.detail.checked;
        }
        else if(event.currentTarget.dataset.title == 'Decimal'){
            this.decimal = event.detail.value;
            console.log(this.decimal);
        }
        else if (event.currentTarget.dataset.title == 'RichText'){
            this.richtextinput = true;
        }
    }

    isRequired(event){
        this.isRequiredcheck = event.target.checked;
        console.log(this.isRequiredcheck);
    }

    isdisabled(event){
        this.isdisabledcheck = event.target.checked;
        console.log(this.isdisabledcheck);
    }
    RichTextData(event){
        this.Richtextvalue =  event.detail.value;
    }
    closerichtext(){
        this.richtextinput = false;
    }

    slider(event){
        if(event.currentTarget.dataset.title == 'Minimum'){
            if(event.detail.value < this.maximumvalue){
                this.minimumvalue =  event.detail.value;
                console.log(this.minimumvalue +' < '+this.maximumvalue);
            }
        }
        else if(event.currentTarget.dataset.title == 'Maximum'){
            if(event.detail.value > this.minimumvalue){
                this.maximumvalue =  event.detail.value;
                console.log(this.minimumvalue +' > '+this.maximumvalue);
            }
        }
        else if(event.currentTarget.dataset.title == 'Reset'){
            this.minimumvalue = 0;
            this.maximumvalue = 128;
        }
    }
    @api
    get salutations(){
       return this.salutation;
    }
    addsalutation(event){
        this.salutation.push({id : this.salutationindex , salutation: ""})
        this.salutationindex ++;
        }

    deletesalutation(event){
        this.salutation.splice(event.currentTarget.dataset.id, 1);
        this.salutationvalue.splice(event.currentTarget.dataset.id, 1);
        this.salutationindex --;
        this.salutation = [];
        for (let index = 0; index < this.salutationindex; index++) {
            this.salutation.push({id : index , salutation: this.salutationvalue[index]});
        }
    }

    salutationvalues(event){
        this.salutationvalue[event.currentTarget.dataset.id] = event.detail.value;
        this.salutation[event.currentTarget.dataset.id] = ({id : event.currentTarget.dataset.id, salutation: this.salutationvalue[event.currentTarget.dataset.id]});
    }
}