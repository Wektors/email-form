<template>
	<div class="first-step">
		<FormEntry label="Imię" v-model="userData.firstName" />
		<!-- :class="{
				unvalidated: !validation(userData.firstName, valType.nonEmptyString),
			}" -->
		<FormEntry label="Drugie imię" v-model="userData.clientData" />
		<!-- :class="{
				unvalidated: !validationOptional(
					userData.secondName,
					valType.nonEmptyString
				),
			}" -->
		<FormEntry label="Nazwisko" v-model="userData.clientData" />
		<!-- :class="{
				unvalidated: !validation(userData.surName, valType.nonEmptyString),
			}" -->
	</div>
</template>

<script>
import userData from "@/js/userData";
import FormEntry from "./FormEntry.vue";

export default {
	name: "FormStep",
	components: {
		FormEntry,
	},
	data() {
		return {
			userData: userData,
		};
	},
	methods: {},
};
</script>

<style></style>
