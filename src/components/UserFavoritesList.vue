<template>
  <favorites-list :authUser="authUser" :favorites="favoritesCollection"></favorites-list>
</template>

<script>
import FavoritesList from "@/components/FavoritesList";
import {db} from "@/firebase";

export default {
  name: "UserFavoritesList",
  components: {FavoritesList},
  props: {
    authUser: {required: true},
  },
  data() {
    return {
      favoritesCollection: [],
    }
  },
  firestore() {
    return {favoritesCollection: db.collection('crafters').doc(this.authUser.uid).collection('favorites')}
  },
}
</script>

<style scoped>

</style>