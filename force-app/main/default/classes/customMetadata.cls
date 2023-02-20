public with sharing class customMetadata {
    Public static String formid{get;set;}
    Public static String test_form_id;
    public string urlvalue{get;set;}
    public customMetadata() {
        urlvalue=Apexpages.currentPage().getParameters().get('formid');
    }
    @AuraEnabled(cacheable=true)
    public static List<Progress_Indicator__mdt> getProgressindicator(){
        return Progress_Indicator__mdt.getAll().values();
       
    }
    @AuraEnabled(cacheable=true)
    public static List<	Captcha_Type__mdt> getCaptchatype(){
        return Captcha_Type__mdt.getAll().values();
       
    }
    @AuraEnabled(cacheable=true)
    public static List<Progress_Indicator__mdt> f_Get_Types(){
        try {
            List<Progress_Indicator__mdt> l_Types = new List<Progress_Indicator__mdt>();
             
            l_Types = [SELECT DeveloperName,Label,sr__c FROM Progress_Indicator__mdt]; // Can include multiple fields, 
            System.debug(l_Types);
            
            // You can also use any standard or custom object
            // You can get values from custom setting also.
             
            return l_Types;
        } catch (Exception e) {
            System.debug('Exception: '+e.getMessage());
            return null;
        }
    }
    @AuraEnabled(cacheable=true)

    public static List<Captcha_Type__mdt> Get_Captcha_Types(){
        try {
            List<Captcha_Type__mdt> Captcha_Types = new List<Captcha_Type__mdt>();
             
            Captcha_Types = [SELECT DeveloperName,Label,sr__c FROM Captcha_Type__mdt]; // Can include multiple fields, 
            System.debug(Captcha_Types);
            
            // You can also use any standard or custom object
            // You can get values from custom setting also.
             
            return Captcha_Types;
        } catch (Exception e) {
            System.debug('Exception: '+e.getMessage());
            return null;
        }
    }
    // @AuraEnabled
    // public static void getformid(String currentformid){
    //     System.debug('u r in get form id');
    //     System.debug('Exception form url in get form id: '+ currentformid);
    //     formid = currentformid;

    // }
    @AuraEnabled
    public static String siteUrl(String Formid){
            System.debug('Exception form url: '+ Formid);
            String formid_test = Formid;
            System.debug('String form id: '+ formid_test);
            System.debug('u r in siteList ');
            Site siteList = [SELECT GuestUserId, Name, MasterLabel, Subdomain, UrlPathPrefix FROM Site WHERE Status = 'Active'];
            List<String> siteFullUrlList = new List<String>();
            System.debug('list of siteList :-' + siteList.Name);
            // System.debug('siteFullUrlList' +  siteFullUrlList);
            /** We can get instance of the org from organisation object **/
            // if(siteList.size() == 0){
            //     siteFullUrlList.add('Deactivate');
            // }
            // else{
            //     System.debug('u r in else');
            //     /** We can get instance of the org from organisation object **/
            //     Organization org = [SELECT InstanceName,Name, IsSandbox, OrganizationType FROM Organization];
            //     System.debug('org :- ' +  org.Name);
            //     if(siteList != null && siteList.size() != 0) {
            //         System.debug('u r in siteList not null');
            //         for(Site s: siteList) {
            //             System.debug('u r in siteList for loop');
            //             System.debug('s.Subdomain :- '+s.Subdomain);
            //             if(s.Subdomain == null) {
            //                 System.debug('u r in s.Subdomain');
            //                 String httpStr = 'http://';
            //                 // if(s.OptionsRequireHttps == true) {
            //                 //     httpStr = 'https://';
            //                 // }
            //                 String siteFullUrl = httpStr;
            //                 if(org.IsSandbox == true) {
            //                     siteFullUrl += 'sandbox-';
            //                 }
            //                 siteFullUrl +=  '.';
            //                 siteFullUrl += (org.IsSandbox || org.OrganizationType == 'Developer Edition' ? (org.InstanceName.toLowerCase() + '.') : '') + 'force.com';
            //                 if(s.UrlPathPrefix == null) {
            //                     siteFullUrlList.add(siteFullUrl);
            //                 }
            //     System.debug('siteFullUrl :- ' +  siteFullUrl);

            //             }
            //         }
            //     }
            // }
            String name = siteList.Name;

        // Site site = [SELECT GuestUserId FROM Site WHERE Name = :name];

        // String path = '/sites/servlet.SiteDebugMode';
        // PageReference pr = new PageReference(path);
        // pr.getParameters().put('guid', site.GuestUserId);
        // pr.getParameters().put('sitedebugmode', 'x');
        // String url = pr.getContent().toString().substringAfter('URL=').substringBefore(path);

        // System.debug(url); //eg "http://dev-mysite.cs81.force.com/mysite"



        Site mySite = [select Id from Site where Name =:name];
        SiteDetail mySiteDetail = [select SecureURL from SiteDetail where DurableId = :mySite.Id];

        System.debug(mySiteDetail.SecureURL+siteList.Name);
        String testtest = mySiteDetail.SecureURL+'?formid='+formid_test;
        System.debug(testtest);
        siteFullUrlList.add(mySiteDetail.SecureURL+siteList.Name);
            return testtest;
        // } catch (Exception e) {
        //     System.debug('Exception: '+e.getMessage());
        //     return null;
        // }
    }
   
    

    
}