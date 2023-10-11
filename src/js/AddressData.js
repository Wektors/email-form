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
        this.email = options.email;
        this.phone = options.phone;
        this.street = options.street;
        this.houseNumber = options.houseNumber;
        this.apartmentNumber = options.apartmentNumber;
        this.postalCode = options.postalCode;
        this.city = options.city;
    }
}