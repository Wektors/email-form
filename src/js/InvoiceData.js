import { FormField } from "@/js/FormField";
import Validators from "@/js/Validators";
import SecondStepData from "./SecondStepData";

export default class InvoiceData extends SecondStepData {
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
		// this.enabled = false;
		this.headquarters = new FormField(
			"Siedziba firmy",
			Validators.NOT_EMPTY_STRING,
			options.headquarters,
			"address"
		);
	}

	getLabel() {
		return "Dane kontaktowe oraz adresowe";
	}
}