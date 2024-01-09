<template>
	<div class="container">
			<hr class="line" />
	<div
		v-for="(field, id) in Steps"
		v-bind:key="id"
		class="container">
			<hr class="line" />
			<img class="icon" :src="getIcon(field)"/>
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
	@Prop() mailSend;

	data() {
		return {
			Steps: Steps,
			ProgressIcons: ProgressIcons,
		};
	}
	getIcon(field) {
		if (field + 1 == this.currentStep) {
			return ProgressIcons.complete;
		} else if (this.mailSend == true) {
			return ProgressIcons.complete;
		} else {
			return ProgressIcons[field];
		}
	}

}
</script>

<style>
.complete {
	height: auto;
	margin: 0.5rem;
}
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
.icon {
	width: 1rem;
	height: auto;
	margin: 0.5rem;
}
</style>
