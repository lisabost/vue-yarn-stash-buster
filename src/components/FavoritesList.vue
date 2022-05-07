<template>
  <div class="favorites-list">
    <div v-if="favorites">
      <div v-if="favorites.length > 0">
        <b-row class="favorites-cards">
          <b-card-group deck v-for="(pattern, i) in favorites" :key="i" class="col-12 col-md-6">
            <pattern-card :patternList="false" :authUser="authUser" :item="pattern">
              <template v-slot:pattern-card-header>
                <b-card-title class="favorite-title">{{pattern.name}}</b-card-title>
              </template>
              <template v-slot:user-yarn-details>
                <p class="m-2">Your Yarn: {{pattern.searchYarn.name}}, {{pattern.searchYarn.color}}</p>
              </template>
              <template v-slot:pattern-card-footer>
                <b-row class="footer-buttons d-flex flex-row justify-content-around">
                  <b-button variant="danger" class="mr-3 my-2 btn-outline-tertiary favorite-card-button" @click="removeFromFavorites(pattern)">Remove from Favorites</b-button>
                  <favorites-modal :authUser="authUser" :item="pattern">View Pattern Details</favorites-modal>
                </b-row>
              </template>
            </pattern-card>
          </b-card-group>
        </b-row>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
    <div v-else>
      <b-alert variant="danger" class="mt-5 w-100" show>Add some patterns to your favorites</b-alert>
    </div>
  </div>
</template>

<script>
import PatternCard from "@/components/PatternCard";
import FavoritesModal from "@/components/FavoritesModal";

export default {
  name: "FavoritesList",
  components: {FavoritesModal, PatternCard},
  props: {
    authUser: {required: true},
    favorites: Array,
  },
  methods: {
    removeFromFavorites(pattern) {
      this.$emit('remove-from-favorites', pattern);
    }
  },
}
</script>

<style scoped>
.favorite-card-button {
  color: black;
  border: none;
  font-family: "EB Garamond", serif;
}
.favorite-title {
  font-family: "EB Garamond", serif;
}
</style>