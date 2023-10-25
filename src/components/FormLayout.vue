<template>
    <div>
        <div class="top-container">

            <div class='inner-item'>
                <button>Wyczyść</button>
            </div>
            <div class='inner-item'>
                <button @click="handleSave">Zapisz</button>
                <button v-if="storageEmpty == false" @click="handleLoad">Odczytaj</button>
                <button>Usuń</button>
            </div>
           
        </div>

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
import Storage from '@/js/Storage.js';

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
            Storage: Storage,
        };

    },
    computed: {
        nextStepButton: function (){
            if (this.currentStep === Steps.AddressData){
                return 'Przejdź do podsumowania';
            } else if (this.currentStep === Steps.Summary){
                return 'Wyślij';
            }
            return 'Dalej';

        },
        storageEmpty() {
            if (localStorage.length > 0) {
                return false
            } else {
                return true
            }
        }
    },
    methods: {
        handleBack: function (){
            if (this.currentStep !== Steps.ClientData){
                this.currentStep--;
            }
        },
        handleNext: function (){
            if (this.currentStep === Steps.Summary){
                this.sendMail();
            } else if (this.isValidStep()){
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
        sendMail: function (){
            window.location = this.userData.getMailtoData();
        },
        handleSave: function (){
            let data 
            if (this.currentStep === Steps.ClientData) {
                data = this.userData.client_data.serialize()
            } else if (this.currentStep === Steps.AddressData) {
                data = this.userData.address_data.serialize()
            }
            let keys = Object.keys(data)
            keys.forEach((key) => {
                let value = data[key];
                localStorage.setItem(key, value);
            });
        },
        handleLoad: function (){
            let data 
            if (this.currentStep === Steps.ClientData) {
                data = this.userData.client_data.getFields()
            } else if (this.currentStep === Steps.AddressData) {
                data = this.userData.address_data.getFields()
            }
            const fromStorage = {}
            data.forEach((key) => {
                fromStorage[key] = localStorage.getItem(key);
            });
            
            if (this.currentStep === Steps.ClientData) {
                this.userData.client_data.deserialize(fromStorage)
            } else if (this.currentStep === Steps.AddressData) {
                this.userData.address_data.deserialize(fromStorage)
            }
        },
        
    },
};

</script>

<style scoped>
.top-container {
    margin: 2rem;
    display: flex;
    justify-content: space-between;
}
.inner-item {
    display: flex;
    flex-direction: column;
    align-content: space-around;
}


.footer {
    margin-top: 2rem;
}

</style>
