<template>
  <div>
    <b-button v-b-modal="modalId"><slot></slot></b-button>
    <b-modal scrollable centered :title="item.name" :id="modalId" class="more-details-modal">
      <template>
        <p v-if="item.price > 0">Price: {{item.price}} {{item.currency}}</p>
        <p>Get the Pattern:
          <a :href="`https://ravelry.com/patterns/library/${item.permalink}`">{{item.name}}</a>
        </p>
        <p class="my-4" v-html="item.notes_html"></p>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "MoreDetailsModal",
  props: {item: {type: Object}},
  data() {
    return {
    }
  },
  methods: {
  },
  computed: {
    modalId() {
      return 'modal-' + this.item.id;
    },
  }
}
</script>

<style scoped>
.more-details-modal {
  width: 600px;
}
</style>