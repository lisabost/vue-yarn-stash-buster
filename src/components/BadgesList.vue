<template>
  <b-row>
    <b-col v-for="(badge, i) in badgeList" :key="i">
      <badge-card :badge="badge" :authUser="authUser"></badge-card>
    </b-col>
  </b-row>
</template>

<script>
import BadgeCard from "@/components/BadgeCard";
import {awardBadges} from "@/mixins/awardBadges";
export default {
  name: "BadgesList",
  components: {BadgeCard},
  props: {
    yarnCollection: {type: Array},
    patternCollection: {type: Array},
    authUser: {required: true},
  },
  data() {
    return {
    }
  },
  mixins: [awardBadges],
  created() {
    this.awardBadges(this.yarnCollection, this.patternCollection);
  }
}
</script>

<style scoped>

</style>