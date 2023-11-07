<template>
    <div>
        <div v-show="showClient === true">
            <div v-html="userData.printSummaryWithClient()"></div>
        </div>
        <div v-show="showClient === false">
            <div v-html="userData.printSummaryWithCompany()"></div>
        </div>
    </div>
</template>
<script>

import UserData from '@/js/UserData';

export default {
    name: 'FormSummary',
    props: {
        modelValue: String,
        userData: UserData,
    },
    computed: {
        showClient: function () {
            if (this.modelValue == "clientData") {
                return true;
            } else {
                return false;
            }
        }
    }
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
