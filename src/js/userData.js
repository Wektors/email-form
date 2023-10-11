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
		class ClientData {
			constructor(firstName, secondName, surName) {
				{
					this.firstName = firstName;
					this.id = 0;
				}
				{
					this.secondName = secondName;
					this.id = 1;
				}

				{
					this.surName = surName;
					this.id = 2;
				}
			}
		}

		class AddressData {
			constructor(
				email,
				phone,
				street,
				houseNumber,
				apartmentNumber,
				postalCode,
				city
			) {
				this.email = email;
				this.phone = phone;
				this.street = street;
				this.houseNumber = houseNumber;
				this.apartmentNumber = apartmentNumber;
				this.postalCode = postalCode;
				this.city = city;
			}
		}

		this.client_data = new ClientData(firstName, secondName, surName);

		this.address_data = new AddressData(
			email,
			phone,
			street,
			houseNumber,
			apartmentNumber,
			postalCode,
			city
		);
	}
}
