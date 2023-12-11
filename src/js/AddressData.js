import { FormField } from "@/js/FormField";
import Validators from "@/js/Validators";
import StepData from "./StepData";

export default class AddressData extends StepData {
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