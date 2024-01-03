<template>
	<div class="container">
			<hr class="line" />
	<div
		v-show="currentStep == Steps.ClientData"
		v-for="(field, id) in Steps"
		v-bind:key="id"
		class="container">
			<hr class="line" />
			<img :src="ProgressIcons[field]"/>
			<hr class="line" />
		</div>
		<hr class="line" />
	</div>
</template>

<script>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import Steps from "@/js/Steps.js";
import ProgressIcons from "@/js/ProgressIcons.js";

@Component({
	components: {},
})
export default class ProgressBar extends Vue {
	@Prop() currentStep;
	data() {
		return {
			Steps: Steps,
			ProgressIcons: ProgressIcons,
		};
	}
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
