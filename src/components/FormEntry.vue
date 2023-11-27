<template>
	<div class="step-entry">
		<div class="label">
			{{ formField.label }}
		</div>
		<input
			:class="validityClass"
			type="text"
			:id="formField.label"
			:autocomplete="formField.autocomplete"
			:placeholder="`Wpisz ${formField.label}`"
			v-model="inputValue"
			@input="inputValue"
		/>
	</div>
</template>
<script>
import { FormField } from "@/js/FormField";
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";

@Component({
	components: {
		
	},
})

export default class FormEntry extends Vue {
	@Prop({ type: FormField, required: true, default: () => [] }) formField;

	get validityClass() {
		if (this.formField.showNotValidError() && this.formField._touched) {
			return "validated";
		} else if (
			this.formField.showNotValidError() == false &&
			this.formField._touched
		) {
			return "unvalidated";
		} else {
			return "not-touched";
		}
	}
	get inputValue() {
		return this.formField.value;
	}
	set inputValue(val) {
		this.formField.setValue(val);
	}

	data() {
		return {
			touched: false,
			currentValue: this.formField.value,
			validated: true,
		};
	}
}
</script>

<style scoped>
.label {
	justify-self: left;
	font-size: 1rem;
	color: rgb(79, 75, 75);
}
input {
	height: 1rem;
	margin-top: 0.5rem;
}

.not-touched {
	color: black;
	border: 1px solid rgb(0, 0, 0), 0, 0;
}
.validated {
	color: #00883f;
	border: 1px solid #00883f;
	background-color: white;
	background-image: url(@/assets/success.svg);
	background-repeat: no-repeat;
	background-position-y: calc(0.25rem + 1px);
	background-size: 0.5rem;
	background-position-x: calc(100% - 0.25rem);
}
.unvalidated {
	color: red;
	border: 1px solid red;
	animation: shake 0.25s;
	background-image: url(@/assets/error.svg);
	background-repeat: no-repeat;
	background-position-y: calc(0.25rem + 1px);
	background-size: 0.5rem;
	background-position-x: calc(100% - 0.25rem);
}
@keyframes shake {
	0% {
		transform: translateX(0);
	}
	25% {
		transform: translateX(5px);
	}
	50% {
		transform: translateX(-5px);
	}
	75% {
		transform: translateX(5px);
	}
	100% {
		transform: translateX(0);
	}
}
</style>
