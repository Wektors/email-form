<template>
	<div class="label">
		{{ formField.label }}
	</div>
	<input
		:class="validityClass"
		type="text"
		:placeholder="`Wpisz ${formField.label}`"
		v-model="currentValue"
        @input="handleInput"
	/>
	{{ this.formField.value }}
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
            this.formField.setValue(this.currentValue);
        },
    },
	computed: {
        validityClass: function (){
            if (this.formField.showNotValidError()){
                return 'validated';
            }
            return 'unvalidated';
        },
    },
	watch: {
		load: function () {
			console.log("updated")
			this.currentValue = this.formField.value;
		}
	},
	data() {
		return {
			load: this.formField._load,
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
