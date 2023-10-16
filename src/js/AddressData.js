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
        this.email = new FormField('Email', Validators.email, options.email);
        this.phone = new FormField('Numer telefonu', Validators.phoneNumber, options.phone);
        this.street = new FormField('Ulica', Validators.nonEmptyString, options.street);
        this.houseNumber = new FormField('Numer domu', Validators.number, options.houseNumber);
        this.apartmentNumber = new FormField('Numer mieszkania', Validators.number, options.apartmentNumber);
        this.postalCode = new FormField('Kod pocztowy', Validators.postalCode, options.postalCode);
        this.city = new FormField('Miasto', Validators.nonEmptyString, options.city);
    }

    getFields(){
        return Object.keys(this);
    }
}