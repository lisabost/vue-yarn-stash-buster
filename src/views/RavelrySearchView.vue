<template>
  <div class="mt-3">
    <ravelry-search :authUser="authUser"></ravelry-search>
  </div>
</template>

<script>
import RavelrySearch from "@/components/RavelrySearch";

export default {
  name: "RavelrySearchView",
  components: {RavelrySearch,},
  props: {
    authUser: {required: false}
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>