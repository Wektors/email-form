import PersonalData from "@/js/PersonalData";
import AddressData from "@/js/AddressData";
import CompanyData from "@/js/CompanyData";
import FirstStepType from "./FirstStepType";
import InvoiceData from "@/js/InvoiceData";
import Steps from "@/js/Steps";

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
		this.invoice_data = new InvoiceData(options);
		this.firstStepType = FirstStepType.PersonalData;
		this.useInvoiceData = false;
	}

	get clientData() {
		if (this.firstStepType == FirstStepType.PersonalData) {
			return this.personal_data;
		}
		return this.company_data;
	}

	hasValidData(currentStep) {
		if (currentStep == Steps.ClientData) {
			if (this.firstStepType == FirstStepType.PersonalData) {
				return this.personal_data.isValid();
			}
			if (this.firstStepType == FirstStepType.CompanyData) {
				return this.company_data.isValid();

			}
		}
		if (this.useInvoiceData == true) {
			return this.invoice_data.isValid();

		}
		if (currentStep == Steps.AddressData) {
			return this.address_data.isValid();

		}
		return true;
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
		return `
        <p>${this.clientData.printSummary()}</p>
        <p>${this.address_data.printSummary()}</p>
        `;
	}
	/**
	 *
	 * @returns {string}
	 */
	printForMail() {
		return `
            ${this.clientData.printForMail()}\n
            ${this.address_data.printForMail()}\n
			`;
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
