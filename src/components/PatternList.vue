<template>
  <b-row>
    <b-card-group deck v-for="(pattern, i) in patterns" :key="i" class="col-12 col-md-3 pattern-card-deck">
      <pattern-card :authUser="authUser" :pattern="pattern" @add-to-favorites="addToFavorites"></pattern-card>
    </b-card-group>
  </b-row>
</template>

<script>
import PatternCard from "@/components/PatternCard";
export default {
  name: "PatternList",
  components: {PatternCard},
  props: {
    patterns: {type: Array},
    authUser: {required: false},
  },
  methods: {
    addToFavorites(pattern) {
      this.$emit('add-to-favorites', pattern);
    }
  }
}
</script>

<style scoped>

</style>