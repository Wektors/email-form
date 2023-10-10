export default class userData {
	constructor(
		firstName,
		secondName,
		surName,
		email,
		phone,
		street,
		houseNumber,
		apartmentNumber,
		postalCode,
		city
	) {
		this.client_data = {
			firstName: firstName,
			secondName: secondName,
			surName: surName,
		},
			this.adress_data = {
				email: email,
				phone: phone,
				street: street,
				houseNumber: houseNumber,
				apartmentNumber: apartmentNumber,
				postalCode: postalCode,
				city: city,
			};
	}
}

export const user1 = new userData("fdsaf", "gdfsgfd", "", "", "", "", "", "", "",)
console.log(user1)