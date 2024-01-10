<template>
	<div class="container">
		<hr class="line mobileHidden"/>
		<div v-for="(field, id) in Object.keys(Steps)" v-bind:key="id" class="container">
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

@Component({
	components: {},
})
export default class ProgressBar extends Vue {
	@Prop() currentStep;
	@Prop() mailSend;
	@Prop() Steps;
	@Prop() ProgressIcons;

	data() {
		return {
		};
	}
	getIcon(field) {
		if (this.Steps[field] !== this.currentStep && this.Steps[field] < this.currentStep) {
			return this.ProgressIcons.complete;
		} else if (this.mailSend === true) {
			return this.ProgressIcons.complete;
		} else {
			return this.ProgressIcons[field];
		}
	}
	isActive(field) {
		if (this.Steps[field] == this.currentStep) {
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
