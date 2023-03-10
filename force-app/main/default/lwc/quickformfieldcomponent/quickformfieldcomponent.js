import getFieldCSS from '@salesforce/apex/FormBuilderController.getFieldCSS';
import getLabelCSS from '@salesforce/apex/FormBuilderController.getLabelCSS';
import getHoverCSS from '@salesforce/apex/FormBuilderController.getHoverCSS';
import getFocusCSS from '@salesforce/apex/FormBuilderController.getFocusCSS';
import { LightningElement, api, wire, track } from 'lwc';
import EmojiRating1 from '@salesforce/resourceUrl/EmojiRating1';
import EmojiRating5 from '@salesforce/resourceUrl/EmojiRating5';
import EmojiRating2 from '@salesforce/resourceUrl/EmojiRating2';
import EmojiRating3 from '@salesforce/resourceUrl/EmojiRating3';
import EmojiRating4 from '@salesforce/resourceUrl/EmojiRating4';
import multiright from '@salesforce/resourceUrl/multiright';
import multileft from '@salesforce/resourceUrl/multileft';
import multitick from '@salesforce/resourceUrl/multitick';
import getScaleRating from '@salesforce/apex/FormBuilderController.getScaleRating';
import getreferencevalue from '@salesforce/apex/FormBuilderController.getreferencevalue';
import getpicklistvalue from '@salesforce/apex/FormBuilderController.getpicklistvalue';

export default class Quickformfieldcomponent extends LightningElement {

    // icons'
    multiright = multiright;
    multileft = multileft;
    multitick = multitick;
    emojiRating1 = EmojiRating1;
    emojiRating2 = EmojiRating2;
    emojiRating3 = EmojiRating3;
    emojiRating4 = EmojiRating4;
    emojiRating5 = EmojiRating5;

    @api compview;
    @api tView;
    @api disableField;
    @api fieldAttribute;
    @api fieldAttributeValue;
    @api fieldId;
    @api formid;
    @track scaleRating = [];
    @track isFieldDesabled = false;

    @track FieldShown = true;
    @track LabelShown = true;
    // @api isReqired;
    @api isReqired;
    @track fieldHelpText = 'please fill the help text';
    @track fieldValidations = '';
    FieldLabel;
    @api fieldstype;
    count;
    @track Address = 'Address';
    @track onfocus = false;
    @api getFieldCSS1;
    @api getLabelCSS1;
    @api hovercssproperty;
    @api focuscssproperty;
    @api labelvalue;
    @api labelcheck;
    @api salutationvalue;
    @api helptextcheck;
    @api helptextvalue;
    @api isdisabled;
    @api placeholder;
    @api fieldtype;
    @api termsAndConditionValue;
    @api fieldName;
    @track fieldcount = true;
    d = false;
    @track picklistvalue = [];
    usrViewBool = false;
    referencevalue;
    outsideClick;
     selectedmultipicklistvalues = [];
    @track searchkey = '';
    selmultipicklistvalues = [];
    connectedCallback() {
        this.fieldstype = this.tView.split(',')[1];
        if (this.fieldstype == 'REFERENCE') {
            // this.referencevalues();
        }
        else if (this.fieldstype == 'PICKLIST') {
            this.picklistvalues();
        }
        else if (this.fieldstype == 'MULTIPICKLIST') {
            this.picklistvalues();
        }
        getScaleRating()
            .then(result => {
                this.scaleRating = result;
                console.log(result);
            }).catch(err => {
                console.log(err);
            })
        console.log('c callback ');

        this.onfocus = false;
    }

    renderedCallback() {
        console.log('quickformfield rendered callback!');
        console.log('formid --> ' + this.formid);
        getFieldCSS({ id: this.formid })
            .then(result => {
                console.log(result);
                this.getFieldCSS1 = result;
                console.log('FieldCSS->> ' + this.getFieldCSS1);
                console.log(this.template.querySelectorAll('.slds-input'));
                console.log(this.template.querySelectorAll('.areatext'));
                let array = this.template.querySelectorAll('.slds-input');
                console.log(array.length);
                let str = this.getFieldCSS1;
                let Arr = str.split(';color:');
                let Arr2 = Arr[1].split(';');
                let pcolor = Arr2[0];
                for (let i = 0; i < array.length; i++) {
                    const element = array[i];
                    element.style = str;
                    element.style.setProperty("--c", pcolor);
                }
                this.template.querySelector('select').style = str;
            }).catch(error => {
                console.log('quickformfield --> ' + { error });
            })

        getLabelCSS({ id: this.formid })
            .then(result => {
                console.log(result);
                this.getLabelCSS1 = result;
                console.log('FieldCSS->> ' + this.getLabelCSS1);
                console.log(this.template.querySelectorAll('.flabel'));
                let array = this.template.querySelectorAll('.flabel');
                console.log(array.length);
                let str = this.getLabelCSS1;
                for (let i = 0; i < array.length; i++) {
                    const element = array[i];
                    element.style = 'display:flex;' + str;
                }
                let array2 = this.template.querySelectorAll('.slds-popover--tooltip ');
                console.log(array2.length);
                let str2 = ((this.getLabelCSS1.split('margin-top:'))[1].split(';'))[0];
                for (let j = 0; j < array2.length; j++) {
                    const element = array2[j];
                    element.style = 'margin:top:' + str2;
                }
                const event1 = CustomEvent('startsppiner');
                this.dispatchEvent(event1);
            }).catch(error => {
                console.log({ error });
                const event1 = CustomEvent('startsppiner');
                this.dispatchEvent(event1);
            })

    }

    // @api FieldCSSUpdate(CSSString) {
    //     try {
    //         console.log('FieldCSS->> ' + CSSString);
    //         console.log(this.template.querySelectorAll('.slds-input'));
    //         let array = this.template.querySelectorAll('.slds-input');
    //         console.log(array.length);
    //         let str = '';
    //         if (CSSString == undefined || CSSString == null || CSSString == '') {
    //             str = this.getFieldCSS1;
    //         } else {
    //             str = CSSString;
    //         }
    //         let Arr = str.split(';color:');
    //         let Arr2 = Arr[1].split(';');
    //         let pcolor = Arr2[0];
    //         for (let i = 0; i < array.length; i++) {
    //             const element = array[i];
    //             element.style = str;
    //             element.style.setProperty("--c", pcolor);
    //         }
    //         this.template.querySelector('select').style = str;
    //     } catch (error) {
    //         console.log("In the catch block ==> Method :** FieldCSSUpdate ** || LWC:** quickformfieldcomponent ** ==>", { error });
    //         console.log('above error ==>' + error);
    //     }

    // }

    @api LabelCSSUpdate(CSSString) {
        getLabelCSS({ id: this.formid })
            .then(result => {
                console.log(result);
                this.getLabelCSS1 = result;
                console.log('FieldCSS->> ' + this.getLabelCSS1);
                console.log(this.template.querySelectorAll('.flabel'));
                let array = this.template.querySelectorAll('.flabel');
                console.log(array.length);
                let str = this.getLabelCSS1;
                for (let i = 0; i < array.length; i++) {
                    const element = array[i];
                    element.style = 'display:flex;' + str;
                }
                let array2 = this.template.querySelectorAll('.slds-popover--tooltip');
                console.log(array2.length);
                let str2 = ((this.getLabelCSS1.split('margin-top:'))[1].split(';'))[0];
                for (let j = 0; j < array2.length; j++) {
                    const element = array2[j];
                    element.style = 'margin:top:' + str2;
                }
            }).catch(error => {
                console.log({ error });
            })
    }

    @api handleeffect(type, property) {
        if (type == 'hover') {
            this.hovercssproperty = property;
        }
        else if (type == 'focus') {
            this.focuscssproperty = property;
        }
    }

    handlehover(event) {
        console.log('onhover hovercssproperty --> ' + this.hovercssproperty);
        let str = this.hovercssproperty;
        console.log('onhover str --> ' + str);
        if (this.onfocus) {
            this.handlefocus(event)
        } else {
            event.target.style = str;
        }

    }

    handlefocus(event) {
        if (event.currentTarget.dataset.name == 'REFERENCE') {
            this.fieldId = event.currentTarget.dataset.id;
        }
        console.log('handlefocus ***');
        console.log('this.onfocus --> ', this.onfocus);
        console.log('FieldCSS->> ' + this.focuscssproperty);
        let str = this.focuscssproperty;
        event.target.style = str;
        this.onfocus = true;
        console.log('this.onfocus --> ', this.onfocus);
    }

    handleblur(event) {
        console.log('Blur On Field');
        console.log(event);
        console.log('this.onfocus --> ', this.onfocus);
        if (this.onfocus) {
            this.handlefocus(event);
        } else {
            this.FieldCSSUpdate(this.getFieldCSS1)
        }
    }

    handleblur1(event) {
        this.usrViewBool = false;
        console.log('Blur On Field');
        console.log(event);
        console.log('this.onfocus --> ', this.onfocus);
        this.onfocus = false;
        this.FieldCSSUpdate(this.getFieldCSS1)
    }

    get CheckBoxOp() {
        return [
            { label: 'first', value: 'option1' },
            { label: 'second', value: 'option2' },
        ];
    }
    get hasType() {

        if (this.tView.includes(',')) {
            let tempararyList = this.tView.split(',');
            this.FieldLabel = tempararyList[0];
            this.FieldType = tempararyList[1];
            if (tempararyList.length == 3) {
                this.count = parseInt(tempararyList[2]);
            }
            this.tView = this.FieldLabel;

            if (this.FieldType != undefined && this.FieldType != 'undefined' && this.FieldType != 'Extra') {
                if (this.FieldType == 'QFADDRESS') {
                    this.tView = this.FieldType;
                    this.Address = this.FieldLabel;
                    return false;
                }
                return true;
            }
        }
        return false;

    }
    @track placeHolder = 'New Field';
    get isFieldCompView() {
        return this.compview == 'Field';
    }
    get isFullView() {
        return this.compview == 'Full';
    }
    get isTrueEmail() {
        this.tView = this.tView.split(',')[0];

        return this.tView == 'QFEMAILID' || this.FieldLabel == 'QFEMAILID';

    }

    get isTrueFullName() {

        return this.tView == 'QFFULLNAME' || this.FieldLabel == 'QFFULLNAME';
    }
    get isTrueName() {

        return this.tView == 'QFNAME' || this.FieldLabel == 'QFNAME';

    }
    get isTrueAddress() {

        return this.tView == 'QFADDRESS' || this.FieldLabel == 'QFADDRESS';

    }
    get isTruePhone() {

        return this.tView == 'QFPHONE';

    }
    get isTrueCheckBox() {

        return this.tView == 'QFCHECKBOX';

    }
    get isTruePageBreak() {
        return this.tView == 'QFPAGEBREAK';
    }
    get isTrueShortText() {
        return this.tView == 'QFSHORTTEXT';
    }
    get isTrueLongText() {

        return this.tView == 'QFLONGTEXT';

    }
    get isTrueFileUpload() {
        return this.tView == 'QFFILEUPLOAD';
    }
    get isTrueRadioButton() {
        return this.tView == 'QFRADIOBUTTON';
    }
    get isTrueDropDown() {
        return this.tView == 'QFDROPDOWN';
    }
    get isTrueNumber() {

        return this.tView == 'Number';

    }
    get isTruePrice() {
        return this.tView == 'QFPRICE';
    }


    get isTrueDate() {

        return this.tView == 'QFDATE';

    }

    get isTrueTime() {

        return this.tView == 'QFTIME';

    }
    get isTrueDateTime() {

        return this.tView == 'QFDATETIME';

    }
    get isTrueRating() {
        return this.tView == 'QFRATING';
    }
    get isTrueEmojiRating() {
        return this.tView == 'QFEMOJIRATING';
    }
    get isTrueScaleRating() {
        return this.tView == 'QFSCALERATING';
    }
    get isTrueTerms() {
        return this.tView == 'QFTERMSOFSERVICE';
    }
    get isTrueLink() {
        return this.tView == 'QFLINK';

    }
    get isTrueSign() {
        return this.tView == 'QFSIGNATURE';
    }
    get isTruePassword() {

        return this.tView == 'Password';

    }
    get isTrueRichText() {
        console.log('inside the true rich text');
        return this.tView == 'QFRICHTEXT';
    }
    get isTruePercent() {

        return this.tView == 'Percent';

    }
    get isTrueCurrency() {

        return this.tView == 'Currency';

    }
    get isTruePageBreak() {
        return this.tView == 'QFPAGEBREAK';
    }




    get sTrueEmail() {
        if (this.fieldstype == 'EMAIL') {
            console.log('fiedsd');

            return true;
        }
    }

    get sTrueName() {
        if (this.fieldstype == 'STRING') {

            return true;
        }
    }
    get sTrueAddress() {
        if (this.fieldstype == 'QFADDRESS') {

            return true;
        }
    }
    get sTruePhone() {
        if (this.fieldstype == 'PHONE') {

            return true;
        }
    }
    get sTrueCheckBox() {
        if (this.fieldstype == 'BOOLEAN') {

            return true;
        }
    }
    get sTrueLongText() {
        if (this.fieldstype == 'TEXTAREA') {

            return true;
        }
    }

    get sTrueNumber() {
        if (this.fieldstype == 'DOUBLE') {

            return true;
        }
    }

    get sTrueDate() {
        if (this.fieldstype == 'DATE') {

            return true;
        }
    }

    get sTrueTime() {
        if (this.fieldstype == 'TIME') {

            return true;
        }
    }
    get sTrueDateTime() {
        if (this.fieldstype == 'DATETIME') {

            return true;
        }
    }

    get sTrueLink() {
        if (this.fieldstype == 'URL') {

            return true;
        }
    }

    get sTruePassword() {
        if (this.fieldstype == 'ENCRYPTEDSTRING') {

            return true;
        }
    }

    get sTruePercent() {
        if (this.fieldstype == 'PERCENT') {

            return true;
        }
    }
    get sTrueCurrency() {
        if (this.fieldstype == 'CURRENCY') {

            return true;
        }
    }
    get sTruePicklist() {
        if (this.fieldstype == 'PICKLIST') {

            return true;
        }
    }
    get sTrueMultiPicklist() {
        if (this.fieldstype == 'MULTIPICKLIST') {

            return true;
        }
    }
    get sTrueRefernce() {
        if (this.fieldstype == 'REFERENCE') {

            return true;
        }
    }

    getreferncevalue(event) {
        try {
            document.addEventListener('click', this.outsideClick = this.closereference.bind(this));
            event.stopPropagation();

            getreferencevalue({ id: this.fieldId, searchkey: this.searchkey })
                .then(result => {
                    this.referencevalue = result;
                    this.usrViewBool = true;
                    return false;
                });
        } catch (error) {
            console.log('Reference eor' + error);
            this.usrViewBool = false;
        }
    }
    closereference(event) {
        document.removeEventListener('click', this.outsideClick);
        this.usrViewBool = false;
    }
    selectreferencevalue(event) {
        this.searchkey = event.target.value;
    }

    referencevalues(event) {
        try {

            this.searchkey = event.target.value;
            getreferencevalue({ id: this.fieldId, searchkey: this.searchkey })
                .then(result => {
                    this.referencevalue = result;
                    this.usrViewBool = true;

                });
        } catch (error) {
            console.log('Reference error' + error);
            this.usrViewBool = false;
        }
    }
    picklistvalues() {
        try {
            getpicklistvalue({ id: this.fieldId })
                .then(result => {
                    console.log(JSON.stringify(result) + 'Picklist');

                    for (let key in result) {
                        console.log(result[key] + 'pickvlaue');
                        console.log(key);
                        this.picklistvalue.push({ value: result[key], key: key });
                        // console.log(this.picklistvalue[key] + 'values');
                    }


                });
        } catch (error) {
            console.log('Picklist error' + error);
        }
    }

    // get fieldstypes(){
    //     console.log(this.fieldstype + 'fieldstype');
    //     if(this.fieldstype == 'URL'){return 'url'}//
    //     else if(this.fieldstype == 'ENCRYPTEDSTRING' ){return this.fieldstype ='password'}//
    //     else if(this.fieldstype == 'TEXTAREA'){return this.fieldstype = 'textarea'}//
    //     else if(this.fieldstype == 'STRING'){return this.fieldstype = 'text'}//
    //     else if(this.fieldstype == 'EMAIL'){return this.fieldstype = 'email'}//
    //     else if(this.fieldstype == 'DATETIME'){return this.fieldstype = 'datetime'}//
    //     else if(this.fieldstype == 'CURRENCY'){return this.fieldstype = 'currency'}//
    //     else if(this.fieldstype == 'TIME'){return this.fieldstype = 'time'}//
    //     else if(this.fieldstype == 'PICKLIST'){return this.fieldstype = 'picklist'}
    //     else if(this.fieldstype == 'PHONE'){return this.fieldstype = 'phone'}//
    //     else if(this.fieldstype == 'PERCENT'){return this.fieldstype = 'percent'}//
    //     else if(this.fieldstype == 'DOUBLE'){return this.fieldstype = 'number'}//
    //     else if(this.fieldstype == 'MULTIPICKLIST'){return this.fieldstype = 'multipicklist'}
    //     else if(this.fieldstype == 'DATE'){return this.fieldstype = 'date'}//
    //     else if(this.fieldstype == 'BOOLEAN'){return 'checkbox'}//
    //     else if(this.fieldstype == 'Lookup'){return this.fieldstype = 'Text'}

    // }

    OnFieldClick(event) {

    }
    signInit(event) {
        var canvas, ctx, flag = false,
            prevX = 0,
            currX = 0,
            prevY = 0,
            currY = 0,
            dot_flag = false;
        var x = "black",
            y = 2,
            w, h;
        canvas = this.template.querySelector('signaturefield');
        var ratio = Math.max(window.devicePixelRatio || 1, 1);
        w = canvas.width * ratio;
        h = canvas.height * ratio;
        ctx = canvas.getContext("2d");



        canvas.addEventListener("mousemove", function (e) {
            findxy('move', e)
        }, false);
        canvas.addEventListener("mousedown", function (e) {
            findxy('down', e)
        }, false);
        canvas.addEventListener("mouseup", function (e) {
            findxy('up', e)
        }, false);
        canvas.addEventListener("mouseout", function (e) {
            findxy('out', e)
        }, false);

        // Set up touch events for mobile, etc
        canvas.addEventListener("touchstart", function (e) {
            var touch = e.touches[0];
            var mouseEvent = new MouseEvent("mousedown", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
            e.preventDefault();
        }, false);
        canvas.addEventListener("touchend", function (e) {
            var mouseEvent = new MouseEvent("mouseup", {});
            canvas.dispatchEvent(mouseEvent);
        }, false);
        canvas.addEventListener("touchmove", function (e) {
            var touch = e.touches[0];
            var mouseEvent = new MouseEvent("mousemove", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
            e.preventDefault();

        }, false);

        function findxy(res, e) {
            const rect = canvas.getBoundingClientRect();
            if (res == 'down') {
                prevX = currX;
                prevY = currY;
                currX = e.clientX - rect.left;
                currY = e.clientY - rect.top;
                flag = true;
                dot_flag = true;
                if (dot_flag) {
                    ctx.beginPath();
                    ctx.fillStyle = x;
                    ctx.fillRect(currX, currY, 2, 2);
                    ctx.closePath();
                    dot_flag = false;
                }
            }
            if (res == 'up' || res == "out") {
                flag = false;
            }
            if (res == 'move') {
                if (flag) {
                    prevX = currX;
                    prevY = currY;
                    currX = e.clientX - rect.left;
                    currY = e.clientY - rect.top;
                    draw(component, ctx);
                }
            }
        }

        function draw() {
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(currX, currY);
            ctx.strokeStyle = x;
            ctx.lineWidth = y;
            ctx.stroke();
            ctx.closePath();
        }

    } catch(error) {
        console.log({ error });
    }

    emojiRatingValue(event) {
        try {
            var emojiValue = event.target.value;
            var emojiName = event.target.name;
            console.log('emoji Name ==>', emojiName);
            console.log("rating ==>", emojiValue);

            var emojiSelectedEle = this.template.querySelectorAll('.emoji-ratingfield-Selected');
            emojiSelectedEle.forEach(element => {
                element.classList.remove('emoji-ratingfield-Selected');
            });
            var emojiEle = this.template.querySelector('label[title="' + emojiName + '"]');
            emojiEle.classList.add('emoji-ratingfield-Selected');
        } catch (error) {
            console.log('In the catch part of emojiRatingValue ==>', { error });
        }
    }

    selectedvalues(event) {
        try {   
            if(this.selmultipicklistvalues.length > 0){
                var i;
                this.selmultipicklistvalues.forEach((element,index) =>{
                    if(element.value == event.currentTarget.dataset.id){
                        console.log('OUTPUT : ',i);
                        i = index;
                    }
                })
                if(i == undefined){
                    this.selmultipicklistvalues.push({ value: event.currentTarget.dataset.id, key: event.currentTarget.dataset.name });
                    console.log('OUTPUT :if '+this.selmultipicklistvalues.length);
                    this.template.querySelector('div[data-id="' + event.currentTarget.dataset.id + '"]').style.display = 'block';
                }
                else{
                    this.selmultipicklistvalues.splice(i,1);
                    console.log('OUTPUT : else ',this.selmultipicklistvalues.length);
                    this.template.querySelector('div[data-id="' + event.currentTarget.dataset.id + '"]').style.display = 'none';
                        
                }
          
            } else {
                this.selmultipicklistvalues.push({ value: event.currentTarget.dataset.id, key: event.currentTarget.dataset.name });
                this.template.querySelector('div[data-id="' + event.currentTarget.dataset.id + '"]').style.display = 'block';
                console.log(this.selmultipicklistvalues.length);
            }
        } catch (error) {
            console.log(error + 'selected error');
        }
    }
    unselectedvalues(event) {
        try {   
            if(this.selmultipicklistvalues.length > 0){
                var i;
                this.selmultipicklistvalues.forEach((element,index) =>{
                    if(element.value == event.currentTarget.dataset.id){
                        console.log('OUTPUT : ',i);
                        i = index;
                    }
                })
                if(i == undefined){
                    this.selmultipicklistvalues.push({ value: event.currentTarget.dataset.id, key: event.currentTarget.dataset.name });
                    console.log('OUTPUT :if '+this.selmultipicklistvalues.length);
                    this.template.querySelector('div[data-id="' + event.currentTarget.dataset.id + '"]').style.display = 'block';
                }
                else{
                    this.selmultipicklistvalues.splice(i,1);
                    console.log('OUTPUT : else ',this.selmultipicklistvalues.length);
                    this.template.querySelector('div[data-id="' + event.currentTarget.dataset.id + '"]').style.display = 'none';
                        
                }
          
            } else {
                this.selmultipicklistvalues.push({ value: event.currentTarget.dataset.id, key: event.currentTarget.dataset.name });
                this.template.querySelector('div[data-id="' + event.currentTarget.dataset.id + '"]').style.display = 'block';
                console.log(this.selmultipicklistvalues.length);
            }
        } catch (error) {
            console.log(error + 'unselected error');
        }
    }
    rightarrowmulti(event) {
        for (let i = 0; i < this.selmultipicklistvalues.length; i++) {
            this.template.querySelector('div[data-id="' + this.selmultipicklistvalues[i].value + '"]').style.display = 'none';
        }
        for (var j = 0; j < this.selmultipicklistvalues.length; j++) {
            for (var i = 0; i < this.picklistvalue.length; i++) {
                if (this.picklistvalue[i].value == this.selmultipicklistvalues[j].value) {
                    this.selectedmultipicklistvalues.push(this.selmultipicklistvalues[j]);
                    console.log(this.picklistvalue[i]);
                    this.picklistvalue.splice(i, 1);
                }
            }
        }
        this.selmultipicklistvalues = [];
    }
    leftarrowmulti() {
        for (let i = 0; i < this.selmultipicklistvalues.length; i++) {
            this.template.querySelector('div[data-id="' + this.selmultipicklistvalues[i].value + '"]').style.display = 'none';
        }
        for (var j = 0; j < this.selmultipicklistvalues.length; j++) {
            for (var i = 0; i < this.selectedmultipicklistvalues.length; i++) {
                if (this.selectedmultipicklistvalues[i].value == this.selmultipicklistvalues[j].value) {
                    this.picklistvalue.push(this.selmultipicklistvalues[j]);
                    this.selectedmultipicklistvalues.splice(i, 1);
                }
            }
        }
        this.selmultipicklistvalues = [];
    }
}