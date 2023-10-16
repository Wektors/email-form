import { FormField } from '@/js/FormField';
import Validators from '@/js/Validators';

export default class AddressData {
    /**
     *
     * @param {object}options
     * @param {string|undefined}options.email,
     * @param {string|undefined}options.phone,
     * @param {string|undefined}options.street,
     * @param {string|undefined}options.houseNumber,
     * @param {string|undefined}options.apartmentNumber,
     * @param {string|undefined}options.postalCode,
     * @param {string|undefined}options.city,
     */
    constructor(options){
        this.email = new FormField('Email', Validators.EMAIL, options.email);
        this.phone = new FormField('Numer telefonu', Validators.PHONE_NUMBER, options.phone);
        this.street = new FormField('Ulica', Validators.NOT_EMPTY_STRING, options.street);
        this.houseNumber = new FormField('Numer domu', Validators.NUMBER_REQUIRED, options.houseNumber);
        this.apartmentNumber = new FormField('Numer mieszkania', Validators.NUMBER_NOT_REQUIRED, options.apartmentNumber);
        this.postalCode = new FormField('Kod pocztowy', Validators.POSTAL_CODE, options.postalCode);
        this.city = new FormField('Miasto', Validators.NOT_EMPTY_STRING, options.city);
    }

    getFields(){
        return Object.keys(this);
    }

    isValid(){
        return this.email.isValid() &&
            this.phone.isValid() &&
            this.street.isValid() &&
            this.houseNumber.isValid() &&
            this.apartmentNumber.isValid() &&
            this.postalCode.isValid() &&
            this.city.isValid();
    }

    printSummary(){
        return `
        <h3> Dane kontaktowe oraz adresowe:</h3>
        <br />
        ${this.email.label}:  ${this.email.printForSummary()}
        <br />
        ${this.phone.label}:  ${this.phone.printForSummary()}
        <br />
        ${this.street.label}:  ${this.street.printForSummary()}
        <br />
        ${this.houseNumber.label}:  ${this.houseNumber.printForSummary()}  
        <br />
        ${this.apartmentNumber.label}:  ${this.apartmentNumber.printForSummary()}       
        <br />
        ${this.postalCode.label}:  ${this.postalCode.printForSummary()}      
        <br />
        ${this.city.label}:  ${this.city.printForSummary()}
        `;
    }
}