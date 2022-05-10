<template>
  <b-card class="my-2 reusable-card">
    <b-card-header class="card-header"><slot name="header"></slot></b-card-header>
    <b-card-body>
      <slot name="body"></slot>
    </b-card-body>
    <template #footer><slot name="footer"></slot></template>
  </b-card>
</template>

<script>
export default {
  name: "CardBody"
}
</script>

<style scoped lang="scss">
$primary: #AA96DA;
.sticky-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  justify-content: center;
}
.card-header {
  width: 100%;
  background-color: $primary;
}
.reusable-card .card-body {
  padding: 0;
}
</style>