import { FormField } from "@/js/FormField";
import Validators from "@/js/Validators";
import StepData from "./StepData";

export default class ClientData extends StepData {
	/**
	 *
	 * @param {object}options
	 * @param {string|undefined}options.companyName,
	 * @param {string|undefined}options.nipNumber,
	 * @param {string|undefined}options.representative,
	 */

	constructor(options) {
		super();

		this.companyName = new FormField(
			"Nazwa firmy",
			Validators.NOT_EMPTY_STRING,
			options.companyName,
			"organization"
		);
		this.nipNumber = new FormField(
			"NIP",
			Validators.NIP_NUMBER,
			options.nipNumber,
		);
		this.representative = new FormField(
			"Przedstawiciel firmy",
			Validators.DOUBLE_STRING,
			options.representative,
			"name"
		);
	}

	getLabel() {
		return "Dane firmy"
	}
	
}
