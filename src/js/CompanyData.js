import { FormField } from "@/js/FormField";
import Validators from "@/js/Validators";
import Storage from "./Storage";

export default class ClientData {
	/**
	 *
	 * @param {object}options
	 * @param {string|undefined}options.companyName,
	 * @param {string|undefined}options.nipNumber,
	 * @param {string|undefined}options.representative,
	 */

	constructor(options) {
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

	/**
	 *
	 * @returns {string[]}
	 */
	getFields() {
		return Object.keys(this);
	}

	/**
	 *
	 * @returns {boolean}
	 */
	isValid() {
		let valid = true;
		this.getFields().forEach((field) => {
			if (this[field].isValid() === false) {
				valid = false;
			}
		});
		return valid;
	}

	/**
	 *
	 * @returns {string}
	 */
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

	serialize() {
		let serializeMap = {};
		this.getFields().forEach((field) => {
			if (this[field].isValid()) {
				serializeMap[field] = this[field].value;
			}
		});
		return serializeMap;
	}

	deserialize() {
		let classKey = "companyData";
		if (Storage.load("userData") !== null) {
			let fullObject = JSON.parse(Storage.load("userData"));
			let storageMap;
			if (fullObject[classKey] !== null) {
				storageMap = fullObject[classKey];
			}

			let fields = this.getFields();
			fields.forEach((field) => {
				if (storageMap[field] !== undefined) {
					this[field].setValue(storageMap[field]);
				}
			});
		}
	}
}
