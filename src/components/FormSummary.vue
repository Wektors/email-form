<template>
    <div>
            <div v-html="userData.printSummary()"></div>
        
    </div>
</template>
<script>

import UserData from '@/js/UserData';
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";

@Component({
	components: {
        
	},
})

export default class FormSummary extends Vue {
	@Prop({ type: UserData, required: true, default: () => [] }) userData;

}
</script>

<style scoped>
.label {
    font-size: 1rem;
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
