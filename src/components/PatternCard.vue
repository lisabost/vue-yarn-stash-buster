<template>
  <card-body>
    <template>
      <b-card-img class="pattern-image" :src="item.first_photo.medium_url" :alt="item.name"></b-card-img>
      <b-card-title>{{item.name}}</b-card-title>
      <b-card-sub-title>Designer: {{item.pattern_author.name}}</b-card-sub-title>
    </template>

    <template v-slot:footer v-if="patternList">
      <b-row class="footer-buttons d-flex flex-row justify-content-around">
        <more-details-modal :authUser="authUser" :item="item">More Details</more-details-modal>
      </b-row>
    </template>
    <template v-slot:footer v-else>
      <b-row class="footer-buttons d-flex flex-row justify-content-around">
        <favorites-modal :authUser="authUser" :item="item">View Pattern Details</favorites-modal>
      </b-row>
    </template>
  </card-body>
</template>

<script>
import MoreDetailsModal from "@/components/MoreDetailsModal";
import CardBody from "@/components/CardBody";
import {getMoreDetails} from "@/mixins/getMoreDetails";
import FavoritesModal from "@/components/FavoritesModal";

export default {
  name: "PatternCard",
  components: {FavoritesModal, CardBody, MoreDetailsModal},
  mixins: [getMoreDetails],
  props: {
    item: Object,
    authUser: {required: false},
    patternList: {type: Boolean},
  },
  methods: {
    addToFavorites(pattern) {
      this.$emit('add-to-favorites', pattern);
    },
  },
  computed: {

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