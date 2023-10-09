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
		city,
	){
        this.clientData = {
            firstName: firstName,
            secondName: secondName,
            surName: surName,
        },
        this.adressData = {
            email: email,
            phone: phone,
            street: street,
            houseNumber: houseNumber,
            apartmentNumber: apartmentNumber,
            postalCode: postalCode,
            city: city,
        }
    }
}
