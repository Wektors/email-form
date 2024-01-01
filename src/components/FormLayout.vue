<template>
	<div>
		<ProgressBar v-bind:currentStep="this.currentStep"></ProgressBar>
		<div class="top-container">
			<div class="header-container">
				<h1 v-show="currentStep === Steps.ClientData">Dane nabywcy</h1>
				<h1 v-show="currentStep === Steps.AddressData">Dane adresowe</h1>
				<h1 v-show="currentStep === Steps.Summary">Podsumowanie</h1>
			</div>

			<div class="icon-container">
				<Transition>
					<button
						class="icon"
						v-if="storageEmpty === false"
						@click="handleLoad()"
					>
						<div class="tooltip">
							<span class="tooltiptext">Wczytaj</span>
							<img src="@/assets/load.svg" />
						</div>
					</button>
				</Transition>
				<Transition>
					<button
						class="icon"
						v-if="storageEmpty === false"
						@click="handleDelete"
					>
						<div class="tooltip">
							<img src="@/assets/delete.svg" />
							<span class="tooltiptext">Usuń dane</span>
						</div>
					</button>
				</Transition>
				<button class="icon" @click="clearInputs">
					<div class="tooltip">
						<img src="@/assets/refresh.svg" alt="clear inputs" />
						<span class="tooltiptext">Wyczyść krok</span>
					</div>
				</button>
				<button class="icon" @click="handleSave" alt="save">
					<div class="tooltip">
						<span class="tooltiptext">Zapisz</span>
						<img src="@/assets/save.svg" />
					</div>
				</button>
			</div>
		</div>
		<br />
		<div v-show="currentStep === Steps.ClientData">
			<FormStep v-bind:stepData="userData.clientData" />
		</div>
		<FormStep
			v-show="currentStep === Steps.AddressData"
			v-bind:stepData="userData.address_data"
		/>
		<SwitchSection
			v-show="currentStep === Steps.ClientData"
			v-on:changeState="handleShowRadioButtons()"
			:value="this.userData.showRadioButtons"
		>
			<div>
				<input
					name="PersonalData"
					type="radio"
					id="PersonalData"
					:value="FirstStepType.PersonalData"
					@change="handleChangeFirstStep"
					v-model="userData.firstStepType"
				/>
				<!-- zamiast checked musi byc v-model aby dobrze zaznaczone bylo -->
				<label for="PersonalData">Osoba prywatna</label>
				<input
					name="CompanyData"
					type="radio"
					id="CompanyData"
					:value="FirstStepType.CompanyData"
					@change="handleChangeFirstStep"
					v-model="userData.firstStepType"
				/>
				<label for="CompanyData">Firma</label>
			</div>
		</SwitchSection>
		<SwitchSection
			v-show="currentStep === Steps.AddressData"
			v-on:changeState="handleChangeSecondStep()"
			:value="this.userData.useInvoiceData"
		>
			<FormStep
				v-show="currentStep === Steps.AddressData"
				v-bind:stepData="this.userData.invoice_data"
			/>
		</SwitchSection>

		<FormSummary v-show="currentStep === Steps.Summary" :userData="userData" />
		<div class="footer">
			<div>
				<button
					class="button"
					@click="handleBack"
					v-show="currentStep !== Steps.ClientData"
				>
					Wstecz
				</button>
			</div>
			<div>
				<button class="button" @click="handleNext">
					{{ nextStepButton }}
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import UserData from "@/js/UserData.js";
import FormStep from "./FormStep.vue";
import Steps from "@/js/Steps.js";
import FormSummary from "@/components/FormSummary";
import Storage from "@/js/Storage.js";
import FirstStepType from "@/js/FirstStepType";
import SwitchSection from "@/components/SwitchSection";
import ProgressBar from "@/components/ProgressBar";

@Component({
	components: {
		FormSummary,
		FormStep,
		SwitchSection,
		ProgressBar,
	},
})
export default class FormLayout extends Vue {
	data() {
		return {
			FirstStepType: FirstStepType,
			Steps: Steps,
			currentStep: Steps.ClientData,
			showRadioButtons: false,
			userData: new UserData(),
			Storage: Storage,
			storageEmpty: Storage.isEmpty("userData"),
		};
	}
	get nextStepButton() {
		if (this.currentStep === Steps.AddressData) {
			return "Przejdź do podsumowania";
		} else if (this.currentStep === Steps.Summary) {
			return "Wyślij";
		}
		return "Dalej";
	}
	handleBack() {
		if (this.currentStep !== Steps.ClientData) {
			this.currentStep--;
		}
	}
	handleNext() {
		if (this.currentStep === Steps.Summary) {
			this.sendMail();
		} else if (this.isValidStep()) {
			this.currentStep++;
		}
	}
	handleChangeFirstStep(value) {
		this.userData.firstStepType = value.target.value;
	}
	isValidStep() {
		return this.userData.hasValidData(this.currentStep);
	}
	sendMail() {
		window.location = this.userData.getMailtoData();
	}
	handleSave() {
		let toStorage = {};

		if (this.userData.firstStepType === FirstStepType.PersonalData) {
			toStorage["PersonalData"] = this.userData.personal_data.serialize();
		} else {
			toStorage["CompanyData"] = this.userData.company_data.serialize();
		}

		toStorage["AddressData"] = this.userData.address_data.serialize();

		if (this.userData.useInvoiceData === true) {
			toStorage["InvoiceData"] = this.userData.invoice_data.serialize();
		}

		Storage.save(toStorage, "userData");
		Storage.save(this.currentStep, "currentStep");
		Storage.save(Number(this.userData.firstStepType), "firstStepType");
		Storage.save(this.userData.showRadioButtons, "showRadioButtons");
		Storage.save(this.userData.useInvoiceData, "useInvoiceData");

		this.storageEmpty = false;
	}

	handleChangeSecondStep() {
		this.userData.useInvoiceData = !this.userData.useInvoiceData;
	}

	handleShowRadioButtons() {
		this.userData.showRadioButtons = !this.userData.showRadioButtons;
	}

	handleLoad() {
		this.loadUserData();
		this.loadCurrentStep();
		this.loadFirstStepType();
		this.loadUseInvoiceData();
		this.loadShowRadioButtons();
	}

	loadUserData() {
		this.userData.personal_data.deserialize("PersonalData");
		this.userData.company_data.deserialize("CompanyData");
		this.userData.address_data.deserialize("AddressData");
		this.userData.invoice_data.deserialize("InvoiceData");
	}
	loadCurrentStep() {
		const stepLoaded = JSON.parse(Storage.load("currentStep"));
		if (stepLoaded != this.currentStep) {
			this.currentStep = stepLoaded;
		}
	}
	loadFirstStepType() {
		const typeLoaded = JSON.parse(Storage.load("firstStepType"));
		this.userData.firstStepType = typeLoaded;
	}
	loadUseInvoiceData() {
		const typeLoaded = JSON.parse(Storage.load("useInvoiceData"));
		this.userData.useInvoiceData = typeLoaded;
		console.log(this.userData.useInvoiceData);
	}
	loadShowRadioButtons() {
		const typeLoaded = JSON.parse(Storage.load("showRadioButtons"));
		this.userData.showRadioButtons = typeLoaded;
	}

	handleDelete() {
		Storage.delete("userData");
		Storage.delete("currentStep");
		Storage.delete("firstStepType");
		Storage.delete("useInvoiceData");
		Storage.delete("showRadioButtons");
		this.storageEmpty = true;
	}
	clearInputs() {
		if (this.currentStep === Steps.ClientData) {
			this.userData.clearPersonalData();
			this.userData.clearCompanyData();
		} else if (this.currentStep === Steps.AddressData) {
			this.userData.clearAddressData();
		}
	}
}
</script>

<style scoped>
label {
	font-size: 1rem;
}
.top-container {
	margin: 2rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
@media (max-width: 480px) {
	.top-container {
		flex-direction: column;
	}
	.header-container {
		align-self: center;
	}
	.icon-container {
		align-self: flex-end;
	}
	.footer {
		flex-direction: column-reverse;
		justify-content: center;
	}
}
.header-container {
	display: flex;
	align-items: center;
}
.icon-container {
	display: flex;
	align-items: center;
}
.button {
	font-size: 1rem;
	padding: 0.25rem;
	margin: 0.5rem;
}
.icon {
	height: 2rem;
	width: 2rem;
	border: none;
	background-color: rgba(0, 0, 0, 0);
	margin: 0.5rem;
}
img {
	height: 2rem;
	width: 2rem;
}

.footer {
	margin-top: 2rem;
	display: flex;
	justify-content: space-between;
}

.tooltip:hover {
	background-color: rgb(234, 232, 232);
	height: 2rem;
	width: 2rem;
}

.tooltip .tooltiptext {
	visibility: hidden;
	width: 5rem;
	background-color: black;
	color: #fff;
	text-align: center;
	padding: 0.5rem 0;
	border-radius: 0.5rem;
	margin-top: 2.5rem;
	margin-left: -3rem;
	position: absolute;
	z-index: 1;
}
.tooltip:hover .tooltiptext {
	visibility: visible;
}

.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>
