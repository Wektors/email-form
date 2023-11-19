<template>
    <div class="step-container">

        <div
            v-for="(field, id) in stepData.getFields()"
            :key="id"
            class="step-entry"
        >
            <FormEntry
                :form-field="stepData[field]"
            />
        </div>
    </div>
</template>

<script>
import FormEntry from './FormEntry.vue';

export default {
    name: 'FormStep',
    props: {
        stepData: Object,
    },
    components: {
        FormEntry,
    },
};
</script>

<style>
.step-container {
	display: grid;
    grid-template: auto / auto auto;
}
.step-entry {
    display: grid;
    margin: 0.5rem;
}
</style>
