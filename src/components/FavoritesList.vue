<template>
  <div class="favorites-list">
    <div v-if="favorites">
      <div v-if="favorites.length > 0">
        <b-row class="favorites-cards">
          <b-card-group deck v-for="(pattern, i) in favorites" :key="i" class="col-12 col-md-6">
            <pattern-card :patternList="false" :authUser="authUser" :item="pattern">
              <template v-slot:pattern-card-footer>
                <b-row class="footer-buttons d-flex flex-row justify-content-around">
                  <b-button type="button" class="mr-3" @click="removeFromFavorites(pattern)">Remove from Favorites</b-button>
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
.favorites-cards .card-deck {
  width: 400px;
}
</style>