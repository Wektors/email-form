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
					unvalidated: !validationOptional(userData.secondName, valType.nonEmptyString),
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
		<FormEntry label="e-mail" v-model="userData.email" type="e-mail" />
		<FormEntry
			label="numer telefonu"
			v-model="userData.phone"
			type="phone"
		/>
		<FormEntry label="ulica" v-model="userData.street" />
		<FormEntry label="numer domu" v-model="userData.houseNumber" />
		<FormEntry label="numer lokalu" v-model="userData.apartmentNumber" />
		<FormEntry label="kod pocztowy" v-model="userData.postalCode" />
		<FormEntry label="miasto" v-model="userData.city" />

		<br />

		<br />
		<button @click="triggerNextStep(firstStepShow)" v-show="secondStepShow">
			Cofnij
		</button>
		<button @click="triggerSummary()" v-show="secondStepShow">
			Przejdź do podsumowania
		</button>
	</div>

	<div class="summary" v-show="summaryShow">
		<h2>Podsumowanie:</h2>
		<br />
		imie: {{ userData.firstName }}
		<br />

		drugie imie: {{ userData.secondName }}
		<br />

		nazwisko: {{ userData.surName }}

		<br />

		e-mail: {{ userData.email }}

		<br />

		telefon: {{ userData.phone }}

		<br />

		ulica: {{ userData.street }}

		<br />

		numer domu: {{ userData.houseNumber }}

		<br />

		numer mieszkania: {{ userData.apartmentNumber }}

		<br />

		kod pocztowy: {{ userData.postalCode }}

		<br />

		miasto: {{ userData.city }}
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
			},
			showWarning: false,
			allValidated: undefined,
		};
	},
	methods: {
		triggerNextStep() {
			this.firstStepShow = !this.firstStepShow;
			this.secondStepShow = !this.secondStepShow;
		},
		triggerSummary() {
			this.firstStepShow = false;
			this.secondStepShow = false;
			this.summaryShow = !this.summaryShow;
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
	},
};
</script>

<style></style>