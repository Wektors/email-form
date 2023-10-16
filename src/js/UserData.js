import ClientData from '@/js/ClientData';
import AddressData from '@/js/AddressData';

export default class UserData {
    /**
     *
     * @param {object}options
     * @param {string|undefined}options.firstName,
     * @param {string|undefined}options.secondName,
     * @param {string|undefined}options.surName,
     * @param {string|undefined}options.email,
     * @param {string|undefined}options.phone,
     * @param {string|undefined}options.street,
     * @param {string|undefined}options.houseNumber,
     * @param {string|undefined}options.apartmentNumber,
     * @param {string|undefined}options.postalCode,
     * @param {string|undefined}options.city,
     */
    constructor(options = {}){
        this.client_data = new ClientData(options);
        this.address_data = new AddressData(options);
    }

    hasValidClientData(){
        return this.client_data.isValid();
    }

    hasValidAddressData(){
        return this.address_data.isValid();
    }
}
