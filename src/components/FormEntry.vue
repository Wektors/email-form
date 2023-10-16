<template>
	<div class="label">
		{{ label }}
	</div>
	<input
		name="label"
		:class="checkValidity"
		type="text"
		:placeholder="`Wpisz ${label}`"
		:value="modelValue"
		@input="$emit('update:modelValue', $event.target.value)"
	/>
</template>
<script>
export default {
	name: "FormEntry",
	props: {
		value: String,
		label: String,
	},

	computed: {
		checkValidity: function () {
			if (this.validated) {
				return "validated";
			} else {
				return "unvalidated";
			}
		},
	},
	data() {
		return {
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
