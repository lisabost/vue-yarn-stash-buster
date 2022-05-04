<template>
  <div>
    <div v-if="yarnCollection">
      <div v-if="yarnCollection.length > 0">
        <b-row>
          <b-col deck v-for="(yarn, i) in yarnCollection" :key="i" class="col-12 col-md-6 yarn-card-deck">
            <yarn-card :authUser="authUser" class="yarn-card" :yarn="yarn"></yarn-card>
          </b-col>
        </b-row>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
    <div v-else>
      <b-alert variant="danger" class="mt-5 w-100" show>Add some yarn to your stash</b-alert>
    </div>
  </div>
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
$myPurple : #AA96DA;
.yarn-card {
  border-color: $myPurple;
  border-width: 2px;
}
</style>