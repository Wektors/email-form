<template>
	<div class="first-step" v-show="firstStepShow">
		<FormEntry label="Imię" v-model="firstName" />
		<FormEntry label="Drugie imię" v-model="secondName" />
		<FormEntry label="Nazwisko" v-model="surName" />

  </div>
  <br />

	<button @click="triggerNextStep(firstStepShow)" v-show="firstStepShow">
		Przejdź dalej
	</button>


	<div class="second-step" v-show="secondStepShow">
		<FormEntry label="email" v-model="email" type="email" />
		<FormEntry label="numer telefonu" v-model="phone" type="phone" />
		<FormEntry label="ulica" v-model="street" />
		<FormEntry label="numer domu" v-model="houseNumber" />
		<FormEntry label="numer lokalu" v-model="apartmentNumber" />
		<FormEntry label="kod pocztowy" v-model="postalCode" />
		<FormEntry label="miasto" v-model="city" />

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

    <h2>Podsumowanie: </h2>
		<br />
		imie: {{ firstName }}
		<br />

		drugie imie: {{ secondName }}
		<br />

		nazwisko: {{ surName }}

    <br />

		email: {{ email }}

    <br />

		telefon: {{ phone }}

    <br />

		ulica: {{ street }}

    <br />

		numer domu: {{ houseNumber }}

    <br />

		numer mieszkania: {{ apartmentNumber }}

    <br />

		kod pocztowy: {{ postalCode }}

    <br />

		miasto: {{ city }}

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
			firstName: "",
			secondName: "",
			email: "",
			phone: "",
			street: "",
			houseNumber: "",
			apartmentNumber: "",
			postalCode: "",
			city: "",
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
	},
};
</script>

<style scoped>
   
</style>
