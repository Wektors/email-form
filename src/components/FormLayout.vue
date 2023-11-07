<template>
	<div>
		<div class="top-container">
			<div class="inner-item">
				<button @click="clearInputs">Wyczyść krok</button>
			</div>
			<div class="inner-item">
				<button @click="handleSave">Zapisz</button>
				<button v-if="storageEmpty === false" @click="handleLoad()">
					Odczytaj
				</button>
				<button v-if="storageEmpty === false" @click="handleDelete">
					Usuń dane
				</button>
			</div>
		</div>
		<div v-show="currentStep === Steps.ClientData">

			<input
			type="radio"
			id="clientData"
			value="clientData"
			v-model="firstStepType"
			/>
			<label for="clientData">Osoba prywatna</label>
			<br />
			<input
			type="radio"
			id="companyData"
			value="companyData"
			v-model="firstStepType"
			/>
			<label for="companyData">Firma</label>
		</div>
			
		<div v-show="currentStep === Steps.ClientData">
			<FormStep
				v-show="firstStepType === 'clientData'"
				v-model="userData.client_data"
			/>
			<FormStep
				v-show="firstStepType === 'companyData'"
				v-model="userData.company_data"
			/>
		</div>
		<FormStep
			v-show="currentStep === Steps.AddressData"
			v-model="userData.address_data"
		/>
		<FormSummary v-show="currentStep === Steps.Summary" :userData="userData" v-model="firstStepType" />
		<div class="footer">
			<button @click="handleBack" v-show="currentStep !== Steps.ClientData">
				Wstecz
			</button>
			<button @click="handleNext">{{ nextStepButton }}</button>
		</div>
	</div>
</template>

<script>
import UserData from "@/js/UserData.js";
import FormStep from "./FormStep.vue";
import Steps from "@/js/Steps.js";
import FormSummary from "@/components/FormSummary";
import Storage from "@/js/Storage.js";

export default {
	name: "FormLayout",
	components: {
		FormSummary,
		FormStep,
	},
	data() {
		return {
			firstStepType: "clientData",
			Steps: Steps,
			currentStep: Steps.ClientData,
			userData: new UserData(),
			Storage: Storage,
			storageEmpty: Storage.isEmpty("userData"),
		};
	},
	computed: {
		nextStepButton: function () {
			if (this.currentStep === Steps.AddressData) {
				return "Przejdź do podsumowania";
			} else if (this.currentStep === Steps.Summary) {
				return "Wyślij";
			}
			return "Dalej";
		},
	},
	methods: {
		handleBack: function () {
			if (this.currentStep !== Steps.ClientData) {
				this.currentStep--;
			}
		},
		handleNext: function () {
			if (this.currentStep === Steps.Summary) {
				this.sendMail();
			} else if (this.isValidStep()) {
				this.currentStep++;
			}
		},
		isValidStep: function () {
			if (this.currentStep === Steps.ClientData) {
				if (this.firstStepType === "clientData") {
					return this.userData.hasValidClientData();
				} else {
					return this.userData.hasValidCompanyData();
				}
			} else if (this.currentStep === Steps.AddressData) {
				return this.userData.hasValidAddressData();
			}
			return true;
		},
		sendMail: function () {
			window.location = this.userData.getMailtoData();
		},
		handleSave: function () {
			let toStorage = {};

			toStorage["clientData"] = this.userData.client_data.serialize();
		
			toStorage["companyData"] = this.userData.company_data.serialize();
			
			toStorage["addressData"] = this.userData.address_data.serialize();

			Storage.save(toStorage, "userData");
			Storage.save(this.currentStep, "currentStep");
			Storage.save(this.firstStepType, "firstStepType");

			this.storageEmpty = false;
		},
		handleLoad: function () {
			this.loadUserData();
			this.loadCurrentStep();
			this.loadFirstStepType();
		},

		loadUserData: function () {
			this.userData.client_data.deserialize();

			this.userData.company_data.deserialize();

			this.userData.address_data.deserialize();
		},
		loadCurrentStep: function () {
			const stepLoaded = JSON.parse(Storage.load("currentStep"));
			if (stepLoaded != this.currentStep) {
				this.currentStep = stepLoaded;
			}
		},
		loadFirstStepType: function () {
			const typeLoaded = JSON.parse(Storage.load("firstStepType"));
			if (typeLoaded != this.firstStepType) {
				this.firstStepType = typeLoaded;
			}
		},
		handleDelete: function () {
			Storage.delete("userData");
			Storage.delete("currentStep");
			this.storageEmpty = true;
		},
		clearInputs: function () {
			if (this.currentStep === Steps.ClientData) {
				this.userData.clearClientData();
			} else {
				this.userData.clearAddressData();
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
