<template>
	<div>
		<div class="container">
			<label class="switch">
				<input type="checkbox" :value="this.value" @click="triggerSlider" />
				<span class="slider round"></span>
			</label>
			Inne dane do faktury
		</div>
		<slot v-if="this.value == true"> </slot>
	</div>
</template>
<script>
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import FormStep from "./FormStep.vue";

@Component({
	components: {
		FormStep,
	},
})
export default class InvoiceData extends Vue {
	@Prop({ type: Boolean, required: false, default: () => [] }) value;
	data() {
		return {};
	}

	triggerSlider() {
		if (this.value != true) {
			this.value = true;
		} else {
			this.value = false;
		}
	}
}
</script>

<style scoped>
.switch {
	position: relative;
	display: inline-block;
	width: 2rem;
	height: 1rem;
}

.switch input {
	opacity: 0;
	width: 0;
	height: 0;
}

.slider {
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #ccc;
	-webkit-transition: 0.4s;
	transition: 0.4s;
}

.slider:before {
	position: absolute;
	content: "";
	height: 0.75rem;
	width: 0.75rem;
	left: 0.125rem;
	bottom: 0.125rem;
	background-color: white;
	-webkit-transition: 0.4s;
	transition: 0.4s;
}

input:checked + .slider {
	background-color: #2196f3;
}

input:focus + .slider {
	box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
	-webkit-transform: translateX(1rem);
	-ms-transform: translateX(1rem);
	transform: translateX(1rem);
}

/* Rounded sliders */
.slider.round {
	border-radius: 1rem;
}

.slider.round:before {
	border-radius: 50%;
}
</style>
