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
			options.companyName
		);
		this.nipNumber = new FormField(
			"NIP",
			Validators.NIP_NUMBER,
			options.nipNumber
		);
		this.representative = new FormField(
			"Przedstawiciel firmy",
			Validators.DOUBLE_STRING,
			options.representative
		);
	}

	printSummary() {
		let summary = `<h3>Dane firmy:</h3><br/>`;
		this.getFields().forEach((field) => {
			summary += `${this[field].printForSummary()}<br/>`;
		});
		return summary;
	}

	/**
	 *
	 * @returns {string}
	 */
	printForMail() {
		let summary = `Dane firmy:\n\n`;
		this.getFields().forEach((field) => {
			summary += `${this[field].printForSummary()}\n`;
		});
		return summary;
	}
}
