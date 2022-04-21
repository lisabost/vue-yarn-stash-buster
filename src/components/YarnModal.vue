<template>
  <div>
    <b-button @click="$bvModal.show(modalId)"><slot></slot></b-button>
    <b-modal scrollable centered @ok.prevent="saveNewYarn" title="Add Yarn to Stash" :id="modalId">
      <template>
        <b-form validated>
          <b-form-group label="Yarn Name:" label-for="name">
            <b-form-input id="name" v-model="newYarn.yarn.name" required></b-form-input>
            <b-form-invalid-feedback>Yarn name is required</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label="Length in Yards:" label-for="yardage">
            <b-form-input id="yardage" type="number" v-model="newYarn.yarn.length" required></b-form-input>
            <b-form-invalid-feedback>Yarn length must be greater than 0</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label="Color: " label-for="color">
            <b-form-input id="color" v-model="newYarn.yarn.color"></b-form-input>
          </b-form-group>
          <b-form-group label="Yarn Weight:" label-for="weight">
            <b-form-select id="weight" :options="options" v-model="newYarn.yarn.weight" required></b-form-select>
            <b-form-invalid-feedback>Yarn weight is required.</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label="Type of Fiber:" label-for="fiber">
            <b-form-input id="fiber" v-model="newYarn.yarn.fiber"></b-form-input>
          </b-form-group>
        </b-form>
      </template>
    </b-modal>
  </div>
</template>

<script>
import {db} from "@/firebase";
import Yarn from "@/models/Yarn";

export default {
  name: "YarnModal",
  data() {
    return {
      modalId: 'add-yarn-modal',
      options: [
        {value: null, text: 'Select a yarn weight'},
        {value: 'lace', text: 'Lace'},
        {value: 'fingering', text: 'Fingering/Sock'},
        {value: 'sport', text: 'Sport/Baby'},
        {value: 'dk', text: 'DK/Light Worsted'},
        {value: 'worsted', text: 'Worsted/Aran'},
        {value: 'bulky', text: 'Bulky/Chunky'},
        {value: 'roving', text: 'Bulky/Roving'},
        {value: 'jumbo', text: 'Jumbo'},
      ],
      newYarn: {
        yarn: new Yarn()
      }
    }
  },
  methods: {
    saveNewYarn() {
      // Add yarn to stash
      db.collection(Yarn.collectionName)
        .add(this.newYarn.yarn.toFirestore())
        .then(docRef => {
          console.log('Yarn added', docRef)

          // clear the form
          this.newYarn.yarn = new Yarn();
          // close modal
          this.$bvModal.hide(this.modalId);
        })
        .catch(error => {
          console.log('Error adding yarn', error)
        });
    },
  },
  computed: {
  }
}
</script>

<style scoped>

</style>