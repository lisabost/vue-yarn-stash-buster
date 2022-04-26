<template>
  <b-row>
    <b-col deck v-for="(yarn, i) in yarnCollection" :key="i" class="col-12 col-md-6 yarn-card-deck">
      <yarn-card class="yarn-card" :yarn="yarn"></yarn-card>
    </b-col>
  </b-row>
</template>

<script>
import YarnCard from "@/components/YarnCard";

export default {
  name: "YarnList",
  components: {YarnCard},
  props: {
    yarnCollection: {type: Array},
  },
  data() {
    return {
    }
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