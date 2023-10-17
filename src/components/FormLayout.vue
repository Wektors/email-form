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
        <FormSummary
            v-show="currentStep === Steps.Summary"
            :userData="userData"
        />
        <div class="footer">
            <button @click="handleBack" v-show="currentStep !== Steps.ClientData"> Wstecz</button>
            <button @click="handleNext">{{ nextStepButton }}</button>
        </div>
    </div>
</template>

<script>

import UserData from '@/js/UserData.js';
import FormStep from './FormStep.vue';
import Steps from '@/js/Steps.js';
import FormSummary from '@/components/FormSummary';

export default {
    name: 'FormLayout',
    components: {
        FormSummary,
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
            } else if(this.currentStep===Steps.Summary) {
                return "Wyślij"
            }
            return 'Dalej';

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
            if (this.currentStep === Steps.Summary){
                this.sendMail();
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
        sendMail:function (){
            window.location =this.userData.getMailtoData()
        }
    },
};
</script>

<style></style>
