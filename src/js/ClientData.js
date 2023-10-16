import { FormField } from '@/js/FormField';
import Validators from '@/js/Validators';

export default class ClientData {

    /**
     *
     * @param {object}options
     * @param {string|undefined}options.firstName,
     * @param {string|undefined}options.secondName,
     * @param {string|undefined}options.surName,
     */
    constructor(options){
        this.firstName = new FormField('Imię', Validators.NOT_EMPTY_STRING, options.firstName);
        this.secondName = new FormField('Drugie Imię', Validators.NOT_EMPTY_STRING_NOT_REQUIRED, options.secondName);
        this.surName = new FormField('Nazwisko', Validators.NOT_EMPTY_STRING, options.surName);
    }

    getFields(){
        return Object.keys(this);
    }

    setField(field, id){
        this[id] = field;
    }

    isValid(){
        return this.firstName.isValid() && this.secondName.isValid() && this.surName.isValid();
    }
}