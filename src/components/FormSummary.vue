<template>
    <div>
<h1>        Podsumowanie:</h1>

        <p v-html="userData.client_data.printSummary()"/>
        <p v-html="userData.address_data.printSummary()"/>
    </div>
</template>
<script>

import UserData from '@/js/UserData';

export default {
    name: "FormSummary",
    props: {
        userData: UserData,
    },
    methods: {
    },
    computed: {
    },
    data() {
        return {
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
