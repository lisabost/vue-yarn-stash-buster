<template>
  <b-row>
    <b-col deck v-for="(yarn, i) in yarnCollection" :key="i" class="col-12 col-md-6 yarn-card-deck">
      <yarn-card class="yarn-card" :yarn="yarn"></yarn-card>
    </b-col>
  </b-row>
</template>

<script>
import {db} from "@/firebase";
import YarnCard from "@/components/YarnCard";

export default {
  name: "YarnList",
  components: {YarnCard},
  data() {
    return {
      yarnCollection: []
    }
  },
  firestore: {
    yarnCollection: db.collection('yarn')
  },
  methods: {
  }
}
</script>

<style scoped>
.yarn-card {
  background-color: #BEEFF7;
}
</style>