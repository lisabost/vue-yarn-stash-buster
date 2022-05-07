<template>
  <b-row>
    <b-card-group deck v-for="pattern in patterns" :key="pattern.id" class="col-12 col-md-3 pattern-card-deck">
      <pattern-card class="pattern-list-cards" :authUser="authUser" :item="pattern">
        <template v-slot:pattern-card-header>
          <h5 class="pattern-title">{{pattern.name}}</h5>
        </template>
        <template v-slot:pattern-card-footer>
          <b-row class="footer-buttons d-flex flex-row justify-content-around">
            <more-details-modal :authUser="authUser" :item="pattern">More Details</more-details-modal>
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
  methods: {
  },
}
</script>

<style scoped>
.pattern-title {
  font-family: "EB Garamond", serif;
}
</style>