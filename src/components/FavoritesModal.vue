<template>
  <div>
    <b-button variant="secondary" class="my-2 btn-outline-tertiary favorites-modal-button" @click="$bvModal.show(modalId)"><slot></slot></b-button>
    <b-modal scrollable centered :title="item.name" :id="modalId" class="basic-modal" cancel-title="Close" cancel-variant="danger">
      <template v-if="item">
        <p v-if="item.price > 0">Price: {{item.price}} {{item.currency}}</p>
        <p>Get the Pattern:
          <a :href="`https://ravelry.com/patterns/library/${item.permalink}`">{{item.name}}</a>
        </p>
        <p class="my-4" v-html="item.notes"></p>
      </template>
      <template v-else>
        <p>Loading...</p>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "FavoritesModal",
  props: {
    title: {type: String},
    id: {type: String},
    item: {type: Object},
  },
  methods: {

  },
  computed: {
    modalId() {
      return 'modal-' + this.item.id;
    }
  }
}
</script>

<style scoped>
.favorites-modal-button {
  color: black;
  font-family: "EB Garamond", serif;
}
</style>