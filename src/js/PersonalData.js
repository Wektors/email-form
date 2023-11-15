import { FormField } from "@/js/FormField";
import Validators from "@/js/Validators";
import StepData from "./StepData";

export default class PersonalData extends StepData {
	/**
	 *
	 * @param {object}options
	 * @param {string|undefined}options.firstName,
	 * @param {string|undefined}options.secondName,
	 * @param {string|undefined}options.surName,
	 */
	constructor(options) {
		super();

		this.firstName = new FormField(
			"Imię",
			Validators.NOT_EMPTY_STRING,
			options.firstName
		);
		this.secondName = new FormField(
			"Drugie Imię",
			Validators.NOT_EMPTY_STRING_NOT_REQUIRED,
			options.secondName
		);
		this.surName = new FormField(
			"Nazwisko",
			Validators.NOT_EMPTY_STRING,
			options.surName
		);
	}

	getLabel() {
		return "Dane klienta";
	}
}
