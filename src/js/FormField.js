export class FormField {
    /**
     *
     * @param {string}label
     * @param {Validators}validator
     * @param {string|undefined}value
     */
    constructor(label, validator, value = ''){
        this.label = label;
        this.value = value;
        this.validator = validator;
    }

    setValue(value){
        console.log(value);
        this.value = value;
    }

    get validated(){
        return true;
    }
}