<template>
  <b-modal :id="id" scrollable centered :title="title">
    <slot></slot>
  </b-modal>
</template>

<script>
export default {
  name: "BasicModal",
  props: {
    title: {type: String},
    id: {type: String}
  }
}
</script>

<style scoped>

</style>