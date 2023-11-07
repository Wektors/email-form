export default {
	save: function (data, label) {
		
		localStorage.setItem(label, JSON.stringify(data));

	},
	load: function (data) {
		return localStorage.getItem(data)
	},

	isEmpty: function (key) {
		if (localStorage.getItem(key) !== null) {
			return false;
		} else {
			return true;
		}
	},
	delete: function (key) {
		localStorage.removeItem(key);
	},
};
