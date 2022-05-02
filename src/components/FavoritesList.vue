<template>
  <b-row class="favorites-cards">
    <b-card-group deck v-for="(pattern, i) in favorites" :key="i" class="col-12 col-md-3">
      <pattern-card :authUser="authUser" :pattern="pattern"></pattern-card>
    </b-card-group>
  </b-row>
</template>

<script>
import PatternCard from "@/components/PatternCard";

export default {
  name: "FavoritesList",
  components: {PatternCard},
  props: {
    authUser: {required: true},
    favorites: Array,
  },
}
</script>

<style scoped>

</style>