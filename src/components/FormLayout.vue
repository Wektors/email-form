<template>
	<div>
		<div class="top-container">
			<div class="inner-item">
				<button>Wyczyść krok</button>
			</div>
			<div class="inner-item">
				<button @click="handleSave">Zapisz</button>
				<button v-if="storageEmpty == false" @click="handleLoad">
					Odczytaj
				</button>
				<button v-if="storageEmpty == false" @click="handleDelete">
					Usuń dane
				</button>
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
		<FormSummary v-show="currentStep === Steps.Summary" :userData="userData" />
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
			Steps: Steps,
			currentStep: Steps.ClientData,
			userData: new UserData(),
			Storage: Storage,
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
		storageEmpty() {
			if (localStorage.getItem("userData")) {
				return false;
			} else {
				return true;
			}
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
				return this.userData.hasValidClientData();
			} else if (this.currentStep === Steps.AddressData) {
				return this.userData.hasValidAddressData();
			}
			return true;
		},
		sendMail: function () {
			window.location = this.userData.getMailtoData();
		},
		handleSave: function () {
			let data;
			let keyToStorage = "userData";
			let innerKeyToStorage;
			if (this.currentStep === Steps.ClientData) {
				data = this.userData.client_data.serialize();
				innerKeyToStorage = "clientData";
			} else if (this.currentStep === Steps.AddressData) {
				innerKeyToStorage = "addressData";
				data = this.userData.address_data.serialize();
			}
			let keys = Object.keys(data);
			let valueToStorage = {};
			keys.forEach((key) => {
				valueToStorage[key] = data[key];
			});

			let toStorage = {};

			if (localStorage.getItem("userData")) {
				toStorage = JSON.parse(localStorage.getItem("userData"));
			}

			toStorage[innerKeyToStorage] = valueToStorage;

			localStorage.setItem(keyToStorage, JSON.stringify(toStorage));
			// console.log(toStorage.innerKeyToStorage)
			console.log(localStorage.getItem("userData"));
		},
		handleLoad: function () {
			if (localStorage.getItem("userData") !== null) {
				let dataKey;
				if (this.currentStep === Steps.ClientData) {
					dataKey = "clientData";
				} else if (this.currentStep === Steps.AddressData) {
					dataKey = "addressData";
				}
				let storageObject 
                
                if (localStorage.getItem("userData") !== null) {
                    let fullObject= JSON.parse(localStorage.getItem("userData"));
                    storageObject = fullObject[dataKey]
                }
                console.log(storageObject);
				

				if (this.currentStep === Steps.ClientData) {
					this.userData.client_data.deserialize(storageObject);
				} else if (this.currentStep === Steps.AddressData) {
					this.userData.address_data.deserialize(storageObject);
				}
			}
		},
		handleDelete: function () {
			localStorage.removeItem("userData");
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
