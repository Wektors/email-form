export default {
	save: function (data, label) {
		
		localStorage.setItem(label, JSON.stringify(data));

	},
	load: function (data) {
		return localStorage.getItem(data)
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
