<template>
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
		@input="inputValue.set"
	/>
</template>
<script>
import { FormField } from "@/js/FormField";

export default {
	name: "FormEntry",
	props: {
		formField: FormField,
	},
	methods: {
		
	},
	computed: {
		validityClass: function () {
			if (this.formField.showNotValidError() && this.formField._touched) {
				return "validated";
			} else if (this.formField.showNotValidError() == false  && this.formField._touched) {
				return "unvalidated";
			} else {
				return "not-touched"
			}
		},
		inputValue: {
			get() {
				return this.formField.value;
			},
			set(val) {
				this.formField.setValue(val);
			},
		},
	},
	data() {
		return {
			touched: false,
			currentValue: this.formField.value,
			validated: true,
		};
	},
};
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
	color: #00883F;
	border: 1px solid #00883F;
	background: url(@/assets/success.svg) no-repeat right;
}
.unvalidated {
	color: red;
	border: 1px solid red;
	animation: shake 0.25s; 
	background: url(@/assets/error.svg) no-repeat right;
}
@keyframes shake {
   0% { transform: translateX(0) }
 25% { transform: translateX(5px) }
 50% { transform: translateX(-5px) }
 75% { transform: translateX(5px) }
 100% { transform: translateX(0) }
}
</style>
