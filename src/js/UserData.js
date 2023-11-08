import ClientData from "@/js/ClientData";
import AddressData from "@/js/AddressData";
import CompanyData from "@/js/CompanyData";

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
	constructor(options = {}) {
		this.client_data = new ClientData(options);
		this.address_data = new AddressData(options);
		this.company_data = new CompanyData(options);
	}

	/**
	 *
	 * @returns {boolean}
	 */
	hasValidClientData() {
		return this.client_data.isValid();
	}

	/**
	 *
	 * @returns {boolean}
	 */
	hasValidCompanyData() {
		return this.company_data.isValid();
	}

	/**
	 *
	 * @returns {*}
	 */

	hasValidAddressData() {
		return this.address_data.isValid();
	}

	/**
	 *
	 * @returns {string}
	 */
	getSendData(firstStepType) {
		return window.encodeURIComponent(this.printForMail(firstStepType));
	}

	/**
	 *
	 * @returns {string}
	 */
	printSummaryWithClient() {
		return `<h1>Podsumowanie</h1>
        <p>${this.client_data.printSummary()}</p>
        <p>${this.address_data.printSummary()}</p>
        `;
	}

	/**
	 *
	 * @returns {string}
	 */
	printSummaryWithCompany() {
		return `<h1>Podsumowanie</h1>
        <p>${this.company_data.printSummary()}</p>
        <p>${this.address_data.printSummary()}</p>
        `;
	}

	/**
	 *
	 * @returns {string}
	 */
	printForMail(firstStepType) {
		if (firstStepType === "clientData") {
			return `
            ${this.client_data.printForMail()}\n
            ${this.address_data.printForMail()}\n
			`;
		} else {
			return `
            ${this.company_data.printForMail()}\n
            ${this.address_data.printForMail()}\n
			`;
		}
	}

	/**
	 *
	 * @returns {string}
	 */
	getMailtoData(firstStepType) {
		return `mailto:email@example.com?subject=${encodeURIComponent(
			"Dane z formularza"
		)}&body=${this.getSendData(firstStepType)}&`;
	}

	clearClientData() {
		this.client_data = new ClientData({});
	}
	clearAddressData() {
		this.address_data = new AddressData({});
	}
}
