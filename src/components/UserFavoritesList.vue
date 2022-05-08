<template>
  <favorites-list :authUser="authUser" :favorites="favoritesCollection" @remove-from-favorites="deleteFavorite"></favorites-list>
</template>

<script>
import FavoritesList from "@/components/FavoritesList";
import {db} from "@/firebase";
import {makeToast} from "@/mixins/makeToast";

export default {
  name: "UserFavoritesList",
  components: {FavoritesList},
  props: {
    authUser: {required: true},
  },
  mixins: [makeToast],
  data() {
    return {
      favoritesCollection: [],
    }
  },
  firestore() {
    return {favoritesCollection: db.collection('crafters').doc(this.authUser.uid).collection('favorites')}
  },
  methods: {
    deleteFavorite(pattern) {
      db.collection('crafters').doc(this.authUser.uid).collection('favorites')
        .doc(pattern.id)
        .delete()
        .catch(error => {
          console.error('Error removing pattern from favorites', error);
          this.makeToast('Error removing pattern from favorites', 'Favorites Deletion Failure', 'danger');
        })
        .finally(() => {
          this.makeToast('Successfully removed ' + pattern.name + " from favorites", 'Pattern Deleted', 'success');
        })
    },
  },
}
</script>

<style scoped>

</style>