<template>
  <b-row>
    <b-card-group deck v-for="pattern in patterns" :key="pattern.id" class="col-12 col-md-3 pattern-card-deck">
      <pattern-card class="pattern-list-cards" :authUser="authUser" :item="pattern">
        <template v-slot:pattern-card-header>
          <h5 class="pattern-title">{{pattern.name}}</h5>
        </template>
        <template v-slot:pattern-card-footer v-if="authUser">
          <b-row class="footer-buttons d-flex flex-row justify-content-around">
            <more-details-modal :authUser="authUser" :item="pattern">More Details</more-details-modal>
          </b-row>
        </template>
        <template v-slot:pattern-card-footer v-else>
          <b-row class="footer-buttons d-flex flex-row justify-content-around mx-2">
            <p>Sign into Stash Buster to save this pattern to your favorites!</p>
            <p class="ravelry-link">Ravelry Link: <a :href="`https://ravelry.com/patterns/library/${pattern.permalink}`">{{pattern.name}}</a></p>
          </b-row>
        </template>
      </pattern-card>
    </b-card-group>
  </b-row>
</template>

<script>
import PatternCard from "@/components/PatternCard";
import MoreDetailsModal from "@/components/MoreDetailsModal";

export default {
  name: "PatternList",
  components: {MoreDetailsModal, PatternCard},
  props: {
    patterns: {type: Array},
    authUser: {required: false},
  },
  mixins: [],
  methods: {
    // checkForAchievement() {
    //   if(this.authUser){
    //     this.checkForPatternsSavedAchievement();
    //   }
    // }
  },
}
</script>

<style scoped>
.pattern-title {
  font-family: "EB Garamond", serif;
}
.ravelry-link {
  font-size: small;
}
</style>