<template>
  <b-row>
    <b-col deck v-for="(yarn, i) in yarnCollection" :key="i" class="col-12 col-md-6 yarn-card-deck">
      <yarn-card :authUser="authUser" class="yarn-card" :yarn="yarn"></yarn-card>
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
    authUser: {required: true},
  },
  data() {
    return {
    }
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
$myBlue : #BEEFF7;
.yarn-card {
  background-color: $myBlue;
}
</style>