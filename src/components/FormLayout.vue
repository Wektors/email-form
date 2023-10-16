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
            <button @click="currentStep--" v-show="currentStep !== Steps.ClientData"> wstecz</button>
            <button @click="currentStep++">{{ nextStepButton }}</button>
        </div>
    </div>
</template>

<script>

import UserData from "@/js/UserData.js";
import FormStep from "./FormStep.vue";
import Steps from "@/js/Steps.js";
export default {
	name: "FormLayout",
	components: {
		FormStep,
	},
	data() {
		return {
            Steps: Steps,
            currentStep: Steps.ClientData,
			userData: new UserData()
        };
		
	},
	computed: {
		nextStepButton: function () {
			if (this.currentStep === Steps.AddressData) {
				return "Przejdź do podsumowania"
			} else {
				return "Przejdź do kolejnego kroku"
			}
		}
	},
	methods: {
	},
};
</script>

<style></style>
