<template>
	<div class="first-step">
		
		<!-- eslint-disable -->
		<FormEntry
			v-for="(field, id) in modelValue.getFields()"
			:label="field"
			:key="id"
			
			
			v-model="modelValue[field]" 
		/>
		
		{{ modelValue.firstName }}
	</div>
</template>
	<!-- v-model="modelValue.firstName" -->

<script >
	/* eslint-disable */

import FormEntry from "./FormEntry.vue";
export default {
	name: "FormStep",
	props: {
		modelValue: Object,
	},
	components: {
		FormEntry,
	},
	data() {
		return {};
	},
	methods: {},
};
</script>

<style></style>
