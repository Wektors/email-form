<template>
    <div class="first-step">

        <div
            v-for="(field, id) in modelValue.getFields()"
            :key="id"
        >
            <FormEntry
                :form-field="modelValue[field]"
            />
        </div>
    </div>
</template>

<script>
import FormEntry from './FormEntry.vue';

export default {
    name: 'FormStep',
    props: {
        modelValue: Object,
    },
    components: {
        FormEntry,
    },
};
</script>

<style></style>
