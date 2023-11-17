import PersonalData from "@/js/PersonalData";
import AddressData from "@/js/AddressData";
import CompanyData from "@/js/CompanyData";
import FirstStepType from "./FirstStepType";

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
		this.personal_data = new PersonalData(options);
		this.address_data = new AddressData(options);
		this.company_data = new CompanyData(options);
		this.firstStepType = FirstStepType.PersonalData;
	}

	get clientData() {
		if (this.firstStepType == FirstStepType.PersonalData) {
			return this.personal_data
		} 
		
		return this.company_data
	}

	/**
	 *
	 * @returns {boolean}
	 */
	hasValidPersonalData() {
		return this.personal_data.isValid();
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
	getSendData() {
		return window.encodeURIComponent(this.printForMail(this.firstStepType));
	}

	/**
	 *
	 * @returns {string}
	 */
	printSummary() {
		if (this.firstStepType === FirstStepType.PersonalData) {
			return `<h1>Podsumowanie</h1>
        <p>${this.personal_data.printSummary()}</p>
        <p>${this.address_data.printSummary()}</p>
        `;
		} else {
			return `<h1>Podsumowanie</h1>
        <p>${this.company_data.printSummary()}</p>
        <p>${this.address_data.printSummary()}</p>
        `;
		}
	}
	/**
	 *
	 * @returns {string}
	 */
	printForMail() {
		if (this.firstStepType === FirstStepType.PersonalData) {
			return `
            ${this.personal_data.printForMail()}\n
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
	getMailtoData() {
		return `mailto:email@example.com?subject=${encodeURIComponent(
			"Dane z formularza"
		)}&body=${this.getSendData()}&`;
	}

	clearPersonalData() {
		this.personal_data = new PersonalData({});
	}
	clearCompanyData() {
		this.company_data = new CompanyData({});
	}
	clearAddressData() {
		this.address_data = new AddressData({});
	}
}
