<template>
    <div>


        <FormStep
            v-show="currentStep === Steps.ClientData"
            v-model="userData.client_data"
        />

        <FormStep
            v-show="currentStep === Steps.AddressData"
            v-model="userData.address_data"
        />

        <div
            v-show="currentStep === Steps.Summary"
        >
            Podsumowanie
        </div>
        <div class="footer">
            <button @click="handleBack" v-show="currentStep !== Steps.ClientData"> wstecz</button>
            <button @click="handleNext">{{ nextStepButton }}</button>
        </div>
    </div>
</template>

<script>

import UserData from '@/js/UserData.js';
import FormStep from './FormStep.vue';
import Steps from '@/js/Steps.js';

export default {
    name: 'FormLayout',
    components: {
        FormStep,
    },
    data(){
        return {
            Steps: Steps,
            currentStep: Steps.ClientData,
            userData: new UserData(),
        };

    },
    computed: {
        nextStepButton: function (){
            if (this.currentStep === Steps.AddressData){
                return 'Przejdź do podsumowania';
            } else {
                return 'Przejdź do kolejnego kroku';
            }
        },
    },
    methods: {
        handleBack: function (){
            if (this.currentStep !== Steps.ClientData){
                this.currentStep--;
            }
        },
        handleNext: function (){
            if (this.isValidStep()){
                this.currentStep++;
            }
        },
        isValidStep: function (){
            if (this.currentStep === Steps.ClientData){
                return this.userData.hasValidClientData();
            } else if (this.currentStep === Steps.AddressData){
                return this.userData.hasValidAddressData();
            }
            return true;
        },
    },
};
</script>

<style></style>
