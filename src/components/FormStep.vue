<template>
	<div class="first-step">
            
		<FormEntry label="Imię" v-model="client_data.firstName"/>

		{{  client_data.firstName }}
		
		<FormEntry label="Drugie imię" 
			v-for="(field) in client_data"
			:key="field.id"
			:value="field"

		/>
		<FormEntry label="Nazwisko"  />


	</div>
</template>

<script>

import FormEntry from "./FormEntry.vue";
export default {
	name: "FormStep",
	props: {
	},
	components: {
		FormEntry,
	},
	data() {
		return {
		client_data: Object // musi być w data bo wyswietla sie no mutating props

		};
	},
	methods: {},
};

</script>

<style></style>
