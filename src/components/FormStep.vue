<template>
	<div class="first-step">
            
		<FormEntry label="Imię"/>
		
		<FormEntry label="Drugie imię" />
		<FormEntry label="Nazwisko"  />

		{{  user }}

	</div>
</template>

<script>

import FormEntry from "./FormEntry.vue";
export default {
	name: "FormStep",
	props: {
		user: Object,
	},
	components: {
		FormEntry,
	},
	data() {
		return {
		};
	},
	methods: {},
};

</script>

<style></style>
