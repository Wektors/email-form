<template>
	<div class="container">
		<hr class="line">

		<hr class="line">
		<img src="@/assets/firstStep.svg">
		<hr class="line">

		<hr class="line">
		<img src="@/assets/secondStep.svg">
		<hr class="line">

		<hr class="line">
		<img src="@/assets/summary.svg">
		<hr class="line">

		<hr class="line">

	</div>
</template>

<script>
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator";
import { Steps } from "@/js/Steps.js"

@Component({
	components: {
	},
})
export default class ProgressBar extends Vue {
	@Prop({type: Steps, required: false, default: () => []}) Steps;
}
</script>

<style>
.container {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}
.line {
    width: 1rem;
	margin: 0;
}
img {
	width: 1rem;
	height: auto;
	margin: 0.5rem;
}
</style>