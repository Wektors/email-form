export class FormField {
    /**
     *
     * @param {string}label
     * @param {Validator}validator
     * @param {string|undefined}value
     */
    constructor(label, validator, value = '', autocomplete){
        this.label = label;
        this.value = value;
        this.validator = validator;
        this.autocomplete = autocomplete || undefined;
        this._touched = false;
    }

    /**
     *
     * @param {string}value
     */
    setValue(value){
        this.value = value;
        this._touched = true;
    }

    /**
     *
     * @returns {boolean}
     */
    showNotValidError(){
        return this._touched === false || this.validator.isValid(this.value);
    }

    /**
     *
     * @returns {boolean}
     */
    isValid(){
        this._touched = true;
        return this.validator.isValid(this.value);
    }

    /**
     *
     * @returns {string}
     */
    printForSummary(){
        return this.label + ': ' + this.printValue();

    }

    /**
     *
     * @returns {string}
     */
    printValue(){
        if (this.value.length === 0){
            return '-';
        }
        return this.value;
    }
}