export default class Validator {
    /**
     *
     * @param {ValidatorRegex}regex
     * @param {boolean}required
     */
    constructor(regex, required){
        this._regex = regex;
        this._required = required;
    }

    /**
     *
     * @param {string}value
     * @returns {boolean}
     */
    isValid(value){
        if (this._required === false){
            if (value.length === 0){
                return true;
            }
        }
        return this._regex.test(value);
    }
}
