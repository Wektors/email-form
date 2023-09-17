<template>
  <div class="first-step" v-show='firstStepShow' >
    <FormEntry label="Imię" v-model="firstName" />
    <FormEntry label="Drugie imię" v-model="secondName" />
    <FormEntry label="Nazwisko" v-model="surName" />
    
    <br />
    imie: {{ firstName }}
    <br />
    
    drugie imie: {{ secondName }}
    <br />
    
    nazwisko: {{ surName }}
  </div>

  <button @click="triggerNextStep">Przejdź dalej</button>

</template>

<script>
import FormEntry from "./FormEntry.vue";

export default {
	name: "FormLayout",
	props: {},
	components: {
		FormEntry,
	},
	data() {
		return {
      firstStepShow: true,
			firstName: "",
			secondName: "",
			surName: "",
		};
	},
  methods: {
    triggerNextStep() {
      this.firstStepShow = !this.firstStepShow
    }
  }
};
</script>

<style scoped>
  
</style>
