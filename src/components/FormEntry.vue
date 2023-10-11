<template>
	<div class="label">
		{{ label }}
    </div>
		<input 
			:class="$attrs.class"
			type="text"
			v-bind:placeholder="`Wpisz ${label}`"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
		/>
</template>
<script>
export default {
	name: "FormEntry",
	props: {
		label: String,
        modelValue: String,
	},
	data() {
		return {};
	},
};
</script>

<style scoped>
.label {
	font-size: 18px;
	color: rgb(79, 75, 75);
	padding: 20px;
} 
.unvalidated {
	color: red;
	border: 1px solid red;
}

</style>
