<template>
  <b-row>
    <b-card-group deck v-for="(pattern, i) in patterns" :key="i" class="col-12 col-md-3 pattern-card-deck">
      <card-body>

        <template>
          <b-card-img class="pattern-image" :src="pattern.photos[0].medium_url" :alt="pattern.name"></b-card-img>
          <b-card-title>{{pattern.name}}</b-card-title>
          <b-card-sub-title>Designer: {{pattern.pattern_author.name}}</b-card-sub-title>
        </template>

        <template v-slot:footer>
          <b-row class="footer-buttons d-flex flex-row justify-content-between">
            <b-button size="sm" variant="outline-primary" @click="addToFavorites(pattern)"><b-icon icon="heart-fill"></b-icon> Save</b-button>
            <more-details-modal :item="pattern">More Details</more-details-modal>
          </b-row>
        </template>

      </card-body>
    </b-card-group>
  </b-row>
</template>

<script>
import CardBody from "@/components/CardBody";
import MoreDetailsModal from "@/components/MoreDetailsModal";
export default {
  name: "PatternList",
  components: {MoreDetailsModal, CardBody},
  props: {
    patterns: {type: Array}
  },
  methods: {
    addToFavorites(pattern) {
      this.$emit('add-to-favorites', pattern);
    }
  }
}
</script>

<style scoped>
.pattern-image {
  height: 200px;
  object-fit: cover;
}
.footer-buttons {
  margin-left: 0;
  margin-right: 0;
  padding-left: 0;
}
</style>