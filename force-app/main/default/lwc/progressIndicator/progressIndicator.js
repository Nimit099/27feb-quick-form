import { LightningElement,api, track } from 'lwc';

export default class ProgressIndicator extends LightningElement {
    @api currentpage = 0;
    @api totalpage=2;
    @track getprogreshbar = 'Select';
    
    @track Progress_Bar = false;
    @track Custom_Steps = false;
    @track Standard_Steps = false;
    @track Page_Count = false;
    @track progress_bar_value = 90;
    @api  progress = 'Select';
    connectedCallback(){
        this.tesmethod(this.progress);
    }

    calculation(pageindex, totalpages){

    }
    
    @api tesmethod(strString){
        // alert('hello');
        this.getprogreshbar = strString;
        console.log('this.getprogreshbar>>',this.getprogreshbar);
        // this.test = event.target.value;
        // alert(this.getprogreshbar);
        // alert(test);
        if(this.getprogreshbar=='Select'){
            this.Progress_Bar = false;
            this.Custom_Steps = false;
            this.Standard_Steps = false;
            this.Page_Count = false;
        }
        if(this.getprogreshbar=='Progress_Bar'){
            this.Progress_Bar = true;
            this.Custom_Steps = false;
            this.Standard_Steps = false;
            this.Page_Count = false;
        }
        if(this.getprogreshbar=='Custom_Steps'){
            this.Progress_Bar = false;
            this.Custom_Steps = true;
            this.Standard_Steps = false;
            this.Page_Count = false;
        }
        if(this.getprogreshbar=='Standard_Steps'){
            this.Progress_Bar = false;
            this.Custom_Steps = false;
            this.Standard_Steps = true;
            this.Page_Count = false;
        }
        if(this.getprogreshbar=='Page_Count'){
            this.Progress_Bar = false;
            this.Custom_Steps = false;
            this.Standard_Steps = false;
            this.Page_Count = true;
        }
    }
    @api test2(){
        alert('you are in childe');
    }
    

}