<template>
	<div class="label">
		{{ formField.label }}
	</div>
	<input
		:class="validityClass"
		type="text"
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
			if (this.formField.showNotValidError()) {
				return "validated";
			}
			return "unvalidated";
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
	font-size: 18px;
	color: rgb(79, 75, 75);
	padding: 20px;
}
.validated {
	color: black;
	border: 1px solid black;
}
.unvalidated {
	color: red;
	border: 1px solid red;
}
</style>
