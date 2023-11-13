import Storage from "./Storage";

export default class StepData {
	constructor() {

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
		let classKey = this.constructor.name;
		if (Storage.load("userData") !== null) {
			let fullObject = JSON.parse(Storage.load("userData"));
			let storageMap;
			if (fullObject[classKey] !== undefined) {
				storageMap = fullObject[classKey];
			}
			let fields = this.getFields();
			console.log(fields)
			fields.forEach((field) => {
				if (storageMap[field] !== undefined) {
					this[field].setValue(storageMap[field]);
				}
			});
		}
	}
}
