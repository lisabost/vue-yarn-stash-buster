<template>
  <div class="favorites-list">
    <div v-if="favorites">
      <div v-if="favorites.length > 0">
        <b-row class="favorites-cards">
          <b-card-group deck v-for="(pattern, i) in favorites" :key="i" class="col-12 col-md-3">
            <pattern-card :patternList="false" :authUser="authUser" :item="pattern"></pattern-card>
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

export default {
  name: "FavoritesList",
  components: {PatternCard},
  props: {
    authUser: {required: true},
    favorites: Array,
  },
}
</script>

<style scoped>

</style>