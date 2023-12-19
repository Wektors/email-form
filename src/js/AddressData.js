import SecondStepData from "./SecondStepData";

export default class AddressData extends SecondStepData {
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
	constructor(options) {
		super(options);
	}

	getLabel() {
		return "Dane kontaktowe oraz adresowe";
	}
}