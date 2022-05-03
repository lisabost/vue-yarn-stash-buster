<template>
  <div>
    <b-button @click="$bvModal.show(modalId)"><slot></slot></b-button>
    <b-modal @ok.prevent="saveToFavorites" :ok-title="buttonText" scrollable centered :title="item.name" :id="modalId" class="more-details-modal">
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

export default {
  name: "MoreDetailsModal",
  props: {
    item: {type: Object},
    authUser: {required: false}
  },
  data() {
    return {
      buttonText: `Save to Favorites`,
    }
  },
  mixins: [getMoreDetails, makeToast],
  methods: {
    saveToFavorites() {
      db.collection('crafters').doc(this.authUser.uid).collection('favorites')
          .add(this.pattern.toFirestore())
          .then(docRef => {
            console.log('Pattern saved', docRef);
            this.makeToast(this.pattern.name +' pattern saved to favorites', 'Pattern Saved', 'success');
          })
          .catch(error => {
            console.error('Error saving pattern to favorites', error);
            this.makeToast('Error saving pattern to favorites', 'Pattern Save Failure', 'danger');
          });
      this.$bvModal.hide(this.modalId);
    },

  },
  computed: {
    modalId() {
      return 'modal-' + this.item.id;
    },
  },
  created() {
    this.getMoreDetails(this.item);
  }
}
</script>

<style scoped>
.more-details-modal {
  width: 600px;
}
</style>