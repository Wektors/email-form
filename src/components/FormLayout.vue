<template>
	<div class="first-step" v-show="firstStepShow">
		<FormEntry
			label="Imię"
			v-model="userData.firstName"
			:class="{
				unvalidated: !validation(userData.firstName, valType.nonEmptyString),
			}"
		/>
		<FormEntry
			label="Drugie imię"
			v-model="userData.secondName"
			:class="{
				unvalidated: !validationOptional(
					userData.secondName,
					valType.nonEmptyString
				),
			}"
		/>
		<FormEntry
			label="Nazwisko"
			v-model="userData.surName"
			:class="{
				unvalidated: !validation(userData.surName, valType.nonEmptyString),
			}"
		/>
	</div>
	<br />

	<button @click="triggerFirstStepValidation" v-show="firstStepShow">
		Przejdź dalej
	</button>

	<div class="second-step" v-show="secondStepShow">
		<FormEntry
			label="e-mail"
			v-model="userData.email"
			type="e-mail"
			:class="{
				unvalidated: !validation(userData.email, valType.email),
			}"
		/>
		<FormEntry
			label="numer telefonu"
			v-model="userData.phone"
			type="phone"
			:class="{
				unvalidated: !validation(userData.phone, valType.phoneNumber),
			}"
		/>
		<FormEntry
			label="ulica"
			v-model="userData.street"
			:class="{
				unvalidated: !validation(userData.street, valType.nonEmptyString),
			}"
		/>
		<FormEntry
			label="numer domu"
			v-model="userData.houseNumber"
			:class="{
				unvalidated: !validation(userData.houseNumber, valType.number),
			}"
		/>
		<FormEntry
			label="numer lokalu"
			v-model="userData.apartmentNumber"
			:class="{
				unvalidated: !validationOptional(
					userData.apartmentNumber,
					valType.number
				),
			}"
		/>
		<FormEntry
			label="kod pocztowy"
			v-model="userData.postalCode"
			:class="{
				unvalidated: !validation(userData.postalCode, valType.postalCode),
			}"
		/>
		<FormEntry
			label="miasto"
			v-model="userData.city"
			:class="{
				unvalidated: !validation(userData.city, valType.nonEmptyString),
			}"
		/>

		<br />

		<br />
		<button @click="triggerNextStep(firstStepShow)" v-show="secondStepShow">
			Cofnij
		</button>
		<button @click="triggerSecondStepValidation()" v-show="secondStepShow">
			Przejdź do podsumowania
		</button>
	</div>

	<div class="summary" v-show="summaryShow">
		<h2>Podsumowanie:</h2>
		<br />
		<h3>Dane klienta:</h3>
		<br />
		imie: {{ userData.firstName }}
		<br />
		drugie imie: {{ addHyphen(userData.secondName) }}
		<br />
		nazwisko: {{ userData.surName }}
		<br />
		<h3> Dane kontaktowe oraz adresowe:</h3>
		<br />
		e-mail: {{ userData.email }}
		<br />
		telefon: {{ userData.phone }}
		<br />
		ulica: {{ userData.street }}
		<br />
		numer domu: {{ userData.houseNumber }}
		<br />
		numer mieszkania: {{ addHyphen(userData.apartmentNumber) }}
		<br />
		kod pocztowy: {{ userData.postalCode }}
		<br />
		miasto: {{ userData.city }}
		<br />
		<br />
		<button>
			<a
				v-bind:href="
					'mailto:' + 'email do wysyłki' + '?body=' + dataToSend(userData)
				"
			>
				Wyślij na maila
			</a>
		</button>
	</div>
</template>

<script>
import FormEntry from "./FormEntry.vue";

export default {
	name: "FormLayout",
	props: {},
	components: {
		FormEntry,
	},
	data() {
		return {
			firstStepShow: true,
			secondStepShow: false,
			summaryShow: false,
			userData: {
				firstName: "",
				secondName: "",
				surName: "",
				email: "",
				phone: "",
				street: "",
				houseNumber: "",
				apartmentNumber: "",
				postalCode: "",
				city: "",
			},
			checkValidity: false,
			valType: {
				// validation type
				nonEmptyString: /[a-z]+/i,
				phoneNumber: /\d{9}/i,
				email: /^\w+@{1}\w+\.+\w+/i,
				number: /[1-9]+\d*/i,
				postalCode: /\d{2}-{1}\d{3}/i,
			},
		};
	},
	methods: {
		triggerNextStep() {
			this.firstStepShow = !this.firstStepShow;
			this.secondStepShow = !this.secondStepShow;
			this.checkValidity = false;
		},
		triggerSummary() {
			this.firstStepShow = false;
			this.secondStepShow = false;
			this.summaryShow = !this.summaryShow;
			this.checkValidity = false;
		},
		validation(data, criteria) {
			if (!criteria.test(data) && this.checkValidity) {
				return false;
			} else {
				return true;
			}
		},
		validationOptional(data, criteria) {
			if (!criteria.test(data) && this.checkValidity && data !== "") {
				return false;
			} else {
				return true;
			}
		},
		triggerFirstStepValidation() {
			this.checkValidity = true;
			let firstNameValid = this.validation(
				this.userData.firstName,
				this.valType.nonEmptyString
			);

			let secondNameValid = this.validationOptional(
				this.userData.secondName,
				this.valType.nonEmptyString
			);

			let surNameValid = this.validation(
				this.userData.surName,
				this.valType.nonEmptyString
			);
			if (firstNameValid && secondNameValid && surNameValid) {
				this.triggerNextStep();
			} else {
				this.showWarning = true;
			}
		},

		triggerSecondStepValidation() {
			this.checkValidity = true;

			let emailValid = this.validation(this.userData.email, this.valType.email);

			let phoneValid = this.validationOptional(
				this.userData.phone,
				this.valType.phoneNumber
			);
			let streetValid = this.validation(
				this.userData.streetAddress,
				this.valType.nonEmptyString
			);

			let houseNumberValid = this.validation(
				this.userData.houseNumber,
				this.valType.number
			);

			let apartmentNumberValid = this.validationOptional(
				this.userData.apartmentNumber,
				this.valType.number
			);

			let postalCodeValid = this.validation(
				this.userData.postalCode,
				this.valType.postalCode
			);

			let cityValid = this.validation(
				this.userData.city,
				this.valType.nonEmptyString
			);

			if (
				emailValid &&
				phoneValid &&
				streetValid &&
				houseNumberValid &&
				apartmentNumberValid &&
				postalCodeValid &&
				cityValid
			) {
				this.triggerSummary();
			} 
		},

		addHyphen(data) {
			if (data == "") {
				return "-";
			} else {
				return data;
			}
		},
		dataToSend(data) {
			let readyData = `Dane klienta%3A%0D%0A
				%0D%0A
				imie%3A%20${data.firstName}%0D%0A
				drugie%20imie%3A%20${this.addHyphen(data.secondName)}%0D%0A
				nazwisko%3A%20${data.surName}%0D%0A
				%0D%0A
				Dane%20kontaktowe%20oraz%20adresowe%3A%0D%0A
				e-mail%3A%20${data.email}%0D%0A
				telefon%3A%20${data.phone}%0D%0A
				ulica%3A%20${data.street}%0D%0A
				numer%20domu%3A%20${data.houseNumber}%0D%0A
				numer%20mieszkania%3A%20${this.addHyphen(data.apartmentNumber)}%0D%0A
				kod%20pocztowy%3A%20${data.postalCode}%0D%0A
				miasto%3A%20${data.city}%0D%0A
			`;
			return readyData;
		},
	},
};
</script>

<style></style>
