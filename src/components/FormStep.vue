<template>
	<div class="step-container">
		<div
			v-for="(field, id) in stepData.getFields()"
			v-bind:key="id"
			class="step-entry"
		>
			<FormEntry v-bind:form-field="stepData[field]" />
		</div>
	</div>
</template>

<script>
import FormEntry from "./FormEntry.vue";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import StepData from "@/js/StepData";

@Component({
	components: {
		FormEntry,
	},
})
export default class FormStep extends Vue {
	@Prop({type: StepData, required: false, default: () => []}) stepData;
}
</script>

<style>
.step-container {
	display: grid;
	grid-template: auto / auto auto;
}
.step-entry {
	display: grid;
	margin: 0.5rem;
}
@media (max-width: 480px) {
	.step-container {
		grid-template: auto / auto;
	}
}
</style>
