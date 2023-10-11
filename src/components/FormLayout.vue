<template>
    <div>
        

        <FormStep
            v-show="currentStep === Steps.ClientData"
			:client_data = "userData.client_data"
        />
		
        <FormStep
            v-show="currentStep === Steps.AddressData"
			:client_data = "userData.address_data"
        />

        <div
            v-show="currentStep === Steps.Summary"
        >
Podsumowanie
        </div>
		<Footer>
				<br />
			<button @click="currentStep--" v-show="currentStep !== Steps.ClientData"> wstecz</button>
			<button @click="currentStep++">{{ nextStepButton }}</button>
		</Footer>
    </div>

	

	<!-- <div class="summary" v-show="summaryShow">
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
	</div> -->
</template>

<script>

import UserData from "@/js/UserData.js";
import FormStep from "./FormStep.vue";
import Steps from "@/js/Steps.js";
export default {
	name: "FormLayout",
	components: {
		FormStep,
	},
	props: {
	},
	data() {
		return {
			checkValidity: false, // determines whether errors are shown or not
			valType: {
				// validation type
				nonEmptyString: /[a-z]+/i,
				phoneNumber: /\d{9}/i,
				email: /^\w+@{1}\w+\.+\w+/i,
				number: /[1-9]+\d*/i,
				postalCode: /\d{2}-{1}\d{3}/i,
			},
            Steps: Steps,
            currentStep: Steps.ClientData,
			userData: new UserData()
        };
		
	},
	computed: {
		nextStepButton: function () {
			if (this.currentStep === Steps.AddressData) {
				return "Przejdź do podsumowania"
			} else {
				return "Przejdź do kolejnego kroku"
			}
		}
	},
	methods: {
		triggerNextStep() {
			this.firstStepShow = !this.firstStepShow;
			this.secondStepShow = !this.secondStepShow;
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

		triggerSummary() {
			this.firstStepShow = false;
			this.secondStepShow = false;
			this.summaryShow = !this.summaryShow;
			this.checkValidity = false;
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
