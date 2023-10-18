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

    /**
     *
     * @returns {boolean}
     */
    hasValidClientData(){
        return this.client_data.isValid();
    }

    /**
     *
     * @returns {*}
     */
    hasValidAddressData(){
        return this.address_data.isValid();
    }

    /**
     *
     * @returns {string}
     */
    getSendData(){
        return window.encodeURIComponent(this.printForMail());
    }

    /**
     *
     * @returns {string}
     */
    printSummary(){
        return `<h1>Podsumowanie</h1>
        <p>${this.client_data.printSummary()}</p>
        <p>${this.address_data.printSummary()}</p>
        `;
    }

    /**
     *
     * @returns {string}
     */
    printForMail(){
        return `
            ${this.client_data.printForMail()}\n
            ${this.address_data.printForMail()}\n
        `;
    }

    /**
     *
     * @returns {string}
     */
    getMailtoData(){
        return `mailto:email@example.com?subject=${encodeURIComponent("Dane z formularza")}&body=${this.getSendData()}`;
    }
}
