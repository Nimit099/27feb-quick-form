public with sharing class fieldvalidation {
    public fieldvalidation() {

    }
    @AuraEnabled
    public static String getfieldvalidation(Id fieldId){
        try {
            Form_Fields__c fieldvalidation = [SELECT Id,Field_Validations__c FROM Form_Fields__c WHERE Id =: fieldId ];
            return fieldvalidation.Field_Validations__c;

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void deletefield(Id fieldId){
        try {

            delete [SELECT Id FROM Form_Fields__c WHERE Id =: fieldId];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static void savevalidation(Id fieldId, String fieldValidation){
        try {
            Form_Fields__c field = [SELECT Id,Field_Validations__c	FROM Form_Fields__c WHERE Id =: fieldId];
            field.Field_Validations__c = fieldValidation;
            update field;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}