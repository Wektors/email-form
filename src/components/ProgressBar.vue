<template>
	<div class="container">
		<hr class="line mobileHidden"/>
		<div v-for="(field, id) in Steps" v-bind:key="id" class="container">
			<hr class="line" :class="{ mobileHidden: isActive(field) }" />
			<img
				class="icon"
				:class="{ mobileHidden: isActive(field) }"
				:src="getIcon(field)"
			/>
			<hr class="line" :class="{ mobileHidden: isActive(field) }" />
		</div>
		<hr class="line mobileHidden" />
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
		if (field !== this.currentStep && field < this.currentStep) {
			return ProgressIcons.complete;
		} else if (this.mailSend == true) {
			return ProgressIcons.complete;
		} else {
			return ProgressIcons[field];
		}
	}
	isActive(field) {
		if (field == this.currentStep) {
			return false;
		}
		return true;
	}
}
</script>

<style>
@media (max-width: 480px) {
	.mobileHidden {
		display: none;
	}
}

.container {
	display: flex;
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
