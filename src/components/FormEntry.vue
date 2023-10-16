<template>
	<div class="label">
		{{ formField.label }}
	</div>
	<input
		:class="checkValidity"
		type="text"
		:placeholder="`Wpisz ${formField.label}`"
		v-model="currentValue"
        @input="handleInput"
	/>
</template>
<script>
import { FormField } from '@/js/FormField';

export default {
	name: "FormEntry",
	props: {
		formField: FormField,
	},
    methods: {
        handleInput: function(){
            this.formField.setValue(this.currentValue)
        },
    },
	computed: {
		checkValidity: function () {
			if (this.formField.validated) {
				return "validated";
			} else {
				return "unvalidated";
			}
		},
	},
	data() {
		return {
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
