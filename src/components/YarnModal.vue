<template>
  <div>
    <b-button v-b-modal="modalId" @submit.prevent="saveNewYarn"><slot></slot></b-button>
    <basic-modal title="Add Yarn to Stash" :id="modalId">
      <template>
        <b-form v-model="newYarn">
          <b-form-group label="Yarn Name:" label-for="name">
            <b-form-input id="name" v-model="newYarn.name"></b-form-input>
          </b-form-group>
          <b-form-group label="Length in Yards:" label-for="yardage">
            <b-form-input id="yardage" type="number" v-model="newYarn.length"></b-form-input>
          </b-form-group>
          <b-form-group label="Color: " label-for="color">
            <b-form-input id="color" v-model="newYarn.color"></b-form-input>
          </b-form-group>
          <b-form-group label="Yarn Weight:" label-for="weight">
            <b-form-select id="weight" :options="options" v-model="newYarn.weight"></b-form-select>
          </b-form-group>
          <b-form-group label="Type of Fiber:" label-for="fiber">
            <b-form-input id="fiber" v-model="newYarn.fiber"></b-form-input>
          </b-form-group>
          <b-form-group label="Image" label-for="image">
            <b-form-file></b-form-file>
          </b-form-group>
        </b-form>
      </template>
    </basic-modal>
  </div>
</template>

<script>
import BasicModal from "@/components/BasicModal";
export default {
  name: "YarnModal",
  components: {BasicModal},
  data() {
    return {
      modalId: 'add-yarn-modal',
      options: [
        {value: null, text: 'Select a yarn weight'},
        {value: 1, text: 'Lace'},
        {value: 2, text: 'Fingering/Sock'},
        {value: 3, text: 'Sport/Baby'},
        {value: 4, text: 'DK/Light Worsted'},
        {value: 5, text: 'Worsted/Aran'},
        {value: 6, text: 'Bulky/Chunky'},
        {value: 7, text: 'Bulky/Roving'},
        {value: 8, text: 'Jumbo'},
      ],
      newYarn: {
        name: '',
        length: 0,
        color: '',
        weight: null,
        fiber: '',
        image: ''
      }
    }
  },
  methods: {
    saveNewYarn() {
      // TODO: Add yarn to stash
    }
  }
}
</script>

<style scoped>

</style>