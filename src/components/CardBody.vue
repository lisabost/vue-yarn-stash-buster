<template>
  <b-card class="my-2 card">
    <header><slot name="header"></slot></header>
    <slot></slot>
    <footer class="sticky-footer text-center"><slot name="footer"></slot></footer>
  </b-card>
</template>

<script>
export default {
  name: "CardBody"
}
</script>

<style scoped>
.sticky-footer {
  position: absolute;
  bottom: 0;
  width: 80%;
  justify-content: center;
}
.card {
  height: 400px;
}
</style>