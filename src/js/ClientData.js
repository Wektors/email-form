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
        this.firstName = new FormField('Imię', Validators.nonEmptyString, options.firstName);
        this.secondName = new FormField('Drugie Imię', Validators.nonEmptyString, options.secondName);
        this.surName = new FormField('Nazwisko', Validators.nonEmptyString, options.surName);
    }

    getFields(){
        return Object.keys(this);
    }

    setField(field, id){
        this[id] = field;
    }
}