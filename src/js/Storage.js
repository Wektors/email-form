export default {
	save: function (clientData, addressData, step) {
		let clientDataSerialized = clientData.serialize("client_data");

		let addressDataSerialized = addressData.serialize("address_data");

		let toStorage = {};

		toStorage["clientData"] = clientDataSerialized;
		toStorage["addressData"] = addressDataSerialized;

		localStorage.setItem("userData", JSON.stringify(toStorage));

		localStorage.setItem("currentStep", step);
	},
	loadData: function (clientData, addressData) {
		if (localStorage.getItem("userData") !== null) {
			let clientDataFromStorage;
			let addressDataFromStorage;
			if (localStorage.getItem("userData") !== null) {
				let fullObject = JSON.parse(localStorage.getItem("userData"));
				if (fullObject["clientData"] !== null) {
					clientDataFromStorage = fullObject["clientData"];
				}
				if (fullObject["addressData"] !== null) {
					addressDataFromStorage = fullObject["addressData"];
				}
			}

			clientData.deserialize(clientDataFromStorage);

			addressData.deserialize(addressDataFromStorage);
		}
	},
	loadStep: function () {
		return localStorage.getItem("currentStep");
	},

	isEmpty: function () {
		if (localStorage.getItem("userData") !== null) {
			return false;
		} else {
			return true;
		}
	},
	delete: function () {
		localStorage.removeItem("userData");
		localStorage.removeItem("currentStep");
	},
};
