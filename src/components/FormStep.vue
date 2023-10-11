<template>
	<div class="first-step">
        <FormEntry label="label = ?????"
                   v-for="(field,id) in client_data.getFields()"
                   :key="id"
                   :value="field"
        />
	</div>
</template>

<script>
import FormEntry from "./FormEntry.vue";
import ClientData from '@/js/ClientData';
export default {
	name: "FormStep",
	props: {
        client_data: ClientData,
	},
	components: {
		FormEntry,
	},
	data() {
        return {
        };
	},
	methods: {},
};

</script>

<style></style>
