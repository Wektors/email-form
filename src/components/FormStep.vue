<template>
    <div class="first-step">

        <div
            v-for="(field, id) in stepData.getFields()"
            :key="id"
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

<style></style>
