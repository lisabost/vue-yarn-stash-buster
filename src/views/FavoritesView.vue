<template>
  <div class="yarn-display-view">
    <h2 class="mt-2">Favorite Patterns</h2>
    <template v-if="loggedIn">
      <user-favorites-list :authUser="authUser" :favoritesCollection="favoritesCollection"></user-favorites-list>
    </template>
    <template v-else>
      <b-alert variant="danger" class="mt-5 w-100" show>Please login to see your favorite patterns</b-alert>
    </template>
  </div>
</template>

<script>
import {db} from "@/firebase";
import UserFavoritesList from "@/components/UserFavoritesList";

export default {
  name: "FavoritesView",
  components: {UserFavoritesList},
  props: {
    authUser: {required: true},
  },
  data() {
    return {
      favoritesCollection: []
    }
  },
  firestore() {
    return {favoritesCollection: db.collection('crafters').doc(this.authUser.uid).collection('favorites')}
  },
  methods: {
  },
  computed: {
    loggedIn() {
      return (this.authUser && this.authUser.uid);
    }
  }

}
</script>

<style scoped>

</style>