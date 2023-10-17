export class FormField {
    /**
     *
     * @param {string}label
     * @param {Validator}validator
     * @param {string|undefined}value
     */
    constructor(label, validator, value = ''){
        this.label = label;
        this.value = value;
        this.validator = validator;
    }

    /**
     *
     * @param {string}value
     */
    setValue(value){
        this.value = value;
    }

    /**
     *
     * @returns {boolean}
     */
    isValid(){
        return this.validator.isValid(this.value);
    }

    printForSummary(){
        return this.label + ': ' + this.printValue();

    }

    printValue(){
        if (this.value.length === 0){
            return '-';
        }
        return this.value;
    }
}