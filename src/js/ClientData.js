export default class ClientData {

    /**
     *
     * @param {object}options
     * @param {string|undefined}options.firstName,
     * @param {string|undefined}options.secondName,
     * @param {string|undefined}options.surName,
     */
    constructor(options){
        this.firstName = options.firstName;
        this.secondName = options.secondName;
        this.surName = options.surName;
    }

    getFields(){
        return Object.keys(this);
    }
}