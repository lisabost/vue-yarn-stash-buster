<template>
  <card-body>
    <template>
      <b-card-img class="pattern-image" :src="pattern.first_photo.medium_url" :alt="pattern.name"></b-card-img>
      <b-card-title>{{pattern.name}}</b-card-title>
      <b-card-sub-title>Designer: {{pattern.pattern_author.name}}</b-card-sub-title>
    </template>

    <template v-slot:footer>
      <b-row class="footer-buttons d-flex flex-row justify-content-around">
        <more-details-modal :authUser="authUser" :item="pattern">More Details</more-details-modal>
      </b-row>
    </template>
  </card-body>
</template>

<script>
import MoreDetailsModal from "@/components/MoreDetailsModal";
import CardBody from "@/components/CardBody";

export default {
  name: "PatternCard",
  components: {CardBody, MoreDetailsModal},
  props: {
    pattern: Object,
    authUser: {required: false},
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