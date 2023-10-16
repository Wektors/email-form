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
}