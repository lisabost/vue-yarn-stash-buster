<template>
  <b-card class="my-2 reusable-card">
    <b-card-header class="card-header"><slot name="header"></slot></b-card-header>
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
.reusable-card {
  height: 400px;
  width: 100%;
}
.card-header {
  width: 100%;
}
.reusable-card .card-body {
  padding: 0;
}
</style>