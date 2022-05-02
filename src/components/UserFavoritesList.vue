<template>
  <div class="user-favorites-list">
    <div v-if="favoritesCollection.length !== 0">
      <favorites-list :authUser="authUser" :favorites="favoritesCollection"></favorites-list>
    </div>
    <div v-else>
      <b-alert variant="danger" class="mt-5 w-100" show>Add some patterns to your favorites</b-alert>
    </div>
  </div>
</template>

<script>
import FavoritesList from "@/components/FavoritesList";

export default {
  name: "UserFavoritesList",
  components: {FavoritesList},
  props: {
    authUser: {required: true},
    favoritesCollection: {type: Array},
  }
}
</script>

<style scoped>

</style>