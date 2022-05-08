<template>
  <div>
    <b-button @click="$bvModal.show(modalId)" class="btn-outline-tertiary details-button my-2"><slot></slot></b-button>
    <b-modal @ok.prevent="saveToFavorites" :ok-title="buttonText" cancel-variant="danger" cancel-title="Close" scrollable centered :title="item.name" :id="modalId" class="more-details-modal">
      <template v-if="pattern">
        <p v-if="pattern.price > 0">Price: {{pattern.price}} {{pattern.currency}}</p>
        <p>Get the Pattern:
          <a :href="`https://ravelry.com/patterns/library/${pattern.permalink}`">{{pattern.name}}</a>
        </p>
        <p class="my-4" v-html="pattern.notes_html"></p>
      </template>
      <template v-else>
        <p>Loading...</p>
      </template>
    </b-modal>
  </div>
</template>

<script>
import {getMoreDetails} from "@/mixins/getMoreDetails";
import {db} from "@/firebase";
import {makeToast} from "@/mixins/makeToast";
import firebase from "firebase";
import {checkForNewAchievements} from "@/mixins/checkForNewAchievements";

export default {
  name: "MoreDetailsModal",
  props: {
    item: {type: Object},
    authUser: {required: false},
  },
  data() {
    return {
      buttonText: `Save to Favorites`,
    }
  },
  mixins: [getMoreDetails, makeToast, checkForNewAchievements],
  methods: {
    saveToFavorites() {
      console.log(this.item.searchYarn);
      if(this.item.searchYarn) {
        this.pattern.searchYarn = this.item.searchYarn;
      }
      db.collection('crafters').doc(this.authUser.uid).collection('favorites')
          .add(this.pattern.toFirestore())
          .then(docRef => {
            console.log('Pattern saved', docRef);
            this.makeToast(this.pattern.name +' pattern saved to favorites', 'Pattern Saved', 'success');
            // update count of favorite patterns
            this.$bvModal.hide('modal-' + this.pattern.id);
            this.raiseFavoritePatternCount();
            this.checkForPatternsSavedAchievement();
          })
          .catch(error => {
            console.error('Error saving pattern to favorites', error);
            this.makeToast('Error saving pattern to favorites', 'Pattern Save Failure', 'danger');
          });
    },
    raiseFavoritePatternCount() {
      db.collection('crafters').doc(this.authUser.uid)
          .update({favoritePatternCount: firebase.firestore.FieldValue.increment(1)});

    },
  },
  computed: {
    modalId() {
      return 'modal-' + this.item.id;
    },
  },
  created() {
    this.searchYarn = this.item.searchYarn;
    this.getMoreDetails(this.item);
  }
}
</script>

<style scoped>
.more-details-modal {
  width: 600px;
}
.details-button {
  color: black;
  border: none;
}
</style>