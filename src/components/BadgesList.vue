<template>
  <b-row>
    <b-col v-for="(badge, i) in badgeList" :key="i" class="col-12 col-md-2">
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
    yarnCount: {type: Number},
    favoritePatternCount: {type: Number},
    yarnUsedCount: {type: Number},
    authUser: {required: true},
  },
  data() {
    return {
    }
  },
  mixins: [awardBadges],
  created() {
    this.awardYarnBadges(this.yarnCount);
    this.awardPatternBadges(this.favoritePatternCount);
    this.awardYarnUsedBadges(this.yarnUsedCount);
  }
}
</script>

<style scoped>

</style>