<template>
  <favorites-list :authUser="authUser" :favorites="favoritesCollection" @remove-from-favorites="deleteFavorite"></favorites-list>
</template>

<script>
import FavoritesList from "@/components/FavoritesList";
import {db} from "@/firebase";
import {makeToast} from "@/mixins/makeToast";
import firebase from "firebase";

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
          this.lowerFavoritePatternCount();
          this.makeToast('Succeeded in removing pattern from favorites', 'Pattern Deleted', 'success');
        })
    },
    lowerFavoritePatternCount() {
      db.collection('crafters').doc(this.authUser.uid)
          .update({favoritePatternCount: firebase.firestore.FieldValue.increment(-1)});
    }
  },
}
</script>

<style scoped>

</style>