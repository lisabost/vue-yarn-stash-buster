<template>
  <div class="yarn-display-view">
    <h2 class="my-2 favorites-title">Favorite Patterns</h2>
    <template v-if="loggedIn">
      <user-favorites-list :authUser="authUser"></user-favorites-list>
    </template>
    <template v-else>
      <b-alert variant="danger" class="mt-5 w-100" show>Please login to see your favorite patterns</b-alert>
    </template>
  </div>
</template>

<script>
import UserFavoritesList from "@/components/UserFavoritesList";

export default {
  name: "FavoritesView",
  components: {UserFavoritesList},
  props: {
    authUser: {required: true},
  },
  data() {
    return {
    }
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
.favorites-title {
  font-family: 'EB Garamond', serif;
}
</style>