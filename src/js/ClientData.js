import { FormField } from "@/js/FormField";
import Validators from "@/js/Validators";
import Storage from "./Storage";

export default class ClientData {
	/**
	 *
	 * @param {object}options
	 * @param {string|undefined}options.firstName,
	 * @param {string|undefined}options.secondName,
	 * @param {string|undefined}options.surName,
	 */
	constructor(options) {
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
		let summary = `<h3>Dane klienta:</h3><br/>`;
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
		let summary = `Dane klienta:\n\n`;
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
		let classKey = "clientData"
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
