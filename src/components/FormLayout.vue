<template>
	<div>
		<div class="top-container">
			<div class="inner-item">
				<button class="button" @click="clearInputs">Wyczyść krok</button>
			</div>
			<div class="inner-item">
				<button class="button" @click="handleSave">Zapisz</button>

				<Transition>
					<button
						class="button"
						v-if="storageEmpty === false"
						@click="handleLoad()"
					>
						Odczytaj
					</button>
				</Transition>

				<Transition>
					<button
						class="button"
						v-if="storageEmpty === false"
						@click="handleDelete"
					>
						Usuń dane
					</button>
				</Transition>
			</div>
		</div>
		<div v-show="currentStep === Steps.ClientData">
			<input
				name="PersonalData"
				type="radio"
				id="PersonalData"
				:value="FirstStepType.PersonalData"
				@change="handleChangeFirstStep"
				v-model="this.userData.firstStepType" 
				/>
				<!-- zamiast checked musi byc v-model aby dobrze zaznaczone bylo -->
			<label for="PersonalData">Osoba prywatna</label>
			<br />
			<input
				name="CompanyData"
				type="radio"
				id="CompanyData"
				:value="FirstStepType.CompanyData"
				@change="handleChangeFirstStep"
				v-model="this.userData.firstStepType"
			/>
			<label for="CompanyData">Firma</label>
		</div>

		<div v-show="currentStep === Steps.ClientData">
			<FormStep
				:stepData="userData.clientData"
			/>
			
		</div>

		<FormStep
			v-show="currentStep === Steps.AddressData"
			:stepData="userData.address_data"
		/>

		<FormSummary
			v-show="currentStep === Steps.Summary"
			:userData="userData"
		/>

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
import FirstStepType from "@/js/FirstStepType";

export default {
	name: "FormLayout",
	components: {
		FormSummary,
		FormStep,
	},
	data() {
		return {
			FirstStepType: FirstStepType,
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
		handleChangeFirstStep: function (value) {
			this.userData.firstStepType = value.target.value;
		},
		isValidStep: function () {
			if (this.currentStep === Steps.ClientData) {
				if (this.userData.firstStepType === FirstStepType.PersonalData) {
					return this.userData.hasValidPersonalData();
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

			if (this.userData.firstStepType === FirstStepType.PersonalData) {
				toStorage["PersonalData"] = this.userData.personal_data.serialize();
			}
			else {
				toStorage["CompanyData"] = this.userData.company_data.serialize();
			}

			toStorage["AddressData"] = this.userData.address_data.serialize();

			Storage.save(toStorage, "userData");
			Storage.save(this.currentStep, "currentStep");
			Storage.save(Number(this.userData.firstStepType), "firstStepType");

			this.storageEmpty = false;
		},
		handleLoad: function () {
			this.loadUserData();
			this.loadCurrentStep();
			this.loadFirstStepType();
		},

		loadUserData: function () {
			this.userData.personal_data.deserialize("PersonalData");

			this.userData.company_data.deserialize("CompanyData");

			this.userData.address_data.deserialize("AddressData");
		},
		loadCurrentStep: function () {
			const stepLoaded = JSON.parse(Storage.load("currentStep"));
			if (stepLoaded != this.currentStep) {
				this.currentStep = stepLoaded;
			}
		},
		loadFirstStepType: function () {
			const typeLoaded = JSON.parse(Storage.load("firstStepType"));
				this.userData.firstStepType = typeLoaded;
		},
		handleDelete: function () {
			Storage.delete("userData");
			Storage.delete("currentStep");
			Storage.delete("firstStepType");
			this.storageEmpty = true;
		},
		clearInputs: function () {
			if (this.currentStep === Steps.ClientData) {
				this.userData.clearPersonalData();
				this.userData.clearCompanyData();
			} else if (this.currentStep === Steps.AddressData) {
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
	height: 10vh;
}

.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
.inner-item {
	display: flex;
	flex-direction: column;
	align-content: space-around;
}

.button {
	width: 6vw;
	margin-top: 0.5rem;
}

.footer {
	margin-top: 2rem;
}
</style>
