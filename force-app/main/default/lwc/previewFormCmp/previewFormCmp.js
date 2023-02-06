import { LightningElement,track,api } from 'lwc';

import GetFormPage from '@salesforce/apex/FormBuilderController.GetFormPage';
import HomeIcon from '@salesforce/resourceUrl/leftbar_home';
import FieldIcon from '@salesforce/resourceUrl/leftbar_fieldmapping';
import DesignIcon from '@salesforce/resourceUrl/leftbar_design';
import notificationIcon from '@salesforce/resourceUrl/leftbar_notification';
import ThankyouIcon from '@salesforce/resourceUrl/leftbar_thankyou';
import object from '@salesforce/resourceUrl/leftbar_objectmapping';
import PreviewIcon from '@salesforce/resourceUrl/leftbar_preview';
import PublishIcon from '@salesforce/resourceUrl/leftbar_publish';
import getFieldsRecords from '@salesforce/apex/FormBuilderController.getFieldsRecords';
// import CreateFieldRecord from '@salesforce/apex/FormBuilderController.CreateFieldRecord';
import Add_icon from '@salesforce/resourceUrl/Add_icon';
import Edit_page_icon from '@salesforce/resourceUrl/Edit_page_icon';
import Edit_icon from '@salesforce/resourceUrl/Edit_icon';
import Delete_icon from '@salesforce/resourceUrl/Delete_icon';
// import getFormCSS from '@salesforce/apex/FormBuilderController.getFormCSS';
// import getPageCSS from '@salesforce/apex/FormBuilderController.getPageCSS';
import { NavigationMixin } from "lightning/navigation";

export default class PreviewFormCmp extends LightningElement {

       
    @track spinnerDataTable = true;
    //     icons        // 
    @track homeIcon = HomeIcon;
    designIcon = DesignIcon;
    DeleteIcon = Delete_icon;
    thankyouicon = ThankyouIcon;
    publishIcon = PublishIcon;
    editpageIcon = Edit_page_icon;
    addIcon = Add_icon;
    EditIcon = Edit_icon;
    object =object;
    fieldicon = FieldIcon;
    notificationicon = notificationIcon;
    previewIcon = PreviewIcon;
   



    @api ParentMessage = '';
    @api FormName = '';
    
  
    WieredResult;
    imageSpinner = false;
    pageImageSpinner = false;
    notShowField = true;
    showField = false;
    @track activeDropZone = true;
    @api formid ='';
    //dropzone variables
     count=0;
    @track activeDesignsidebar = false;
    @track activesidebar = false;
    @track activeNotification = false;
    @track activethankyou = false;
    @track FormTitle = 'tempvlaue';
   // Id = this.ParentMessage;// Change When LMS Service Starts
    // Id='a0B1y00000013pXEAQ'
    EditButtonName = "Edit"//"{!'form:::'+v.FormId}"
    nextButton = 'NextButton';
    previousButton = 'previousButton';
    @track index = 0;
    @track newCSS;
    fieldcount  = 0;
    removeObjFields = [];


    @track MainList = [];
    @track PageList = [];
    @track FieldList = [];

    connectedCallback() {

        GetFormPage({ Form_Id: this.formid})
        .then(result => {
            console.log('getformpage result -----> '+ result);
            console.log('get form page called');
            this.PageList = result;
            console.log('this-->>');
            console.log(this.PageList[0].Name);
            console.log('pagelist.length'+this.PageList.length);

        }).catch(error => {
            console.log(error);
        });
    this.secondmethod();

    }

    secondmethod(){
        getFieldsRecords()
            .then(result => {
                console.log('Nimit -->'+result);
                this.FieldList = result;
                this.setPageField(result);
                 
                console.log(this.FieldList.length);
            })
            .catch(error => {
                console.log(error);
            });
    }



    setPageField(fieldLists) {
        let outerlist = [];
        console.log('fieldlist --->' +fieldLists);
        console.log('fieldList length --->'+fieldLists.length);
        console.log('PageList length --->'+this.PageList.length);
        for (let i = 0; i < this.PageList.length; i++) {
            let innerlist = [];
            for (let j = 0; j < fieldLists.length; j++) {
                console.log('fieldList length --->'+fieldLists.length);
                if (this.PageList[i].Id == fieldLists[j].Form_Page__c) {
                    console.log('inside inner loop');
                   let fieldofObj =  fieldLists[j].Name.split(',');
                   console.log('in setpage field----->'+fieldofObj);
                   if(fieldofObj.length==2){
                    console.log(fieldofObj.length);
                     if(fieldofObj[1]!='Extra' && fieldofObj[1]!=undefined && fieldofObj[1]!='undefined'){
                        console.log(fieldofObj[0]);
                        this.removeObjFields.push(fieldofObj[0]);
                     }
                 }
                    innerlist.push(fieldLists[j]);
                }
            }

            let temp = { pageName: this.PageList[i].Name, pageId: this.PageList[i].Id, FieldData: innerlist };

            outerlist.push(temp);
        }
        console.log('OuterList' + outerlist);
        this.MainList = outerlist;
        console.log('Mainlist -->'+this.MainList);
    }
}