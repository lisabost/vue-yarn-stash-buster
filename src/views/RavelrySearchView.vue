<template>
  <div class="mt-3">
    <ravelry-search :authUser="authUser"></ravelry-search>
  </div>
</template>

<script>
import RavelrySearch from "@/components/RavelrySearch";
import {makeToast} from "@/mixins/makeToast";
import {getMoreDetails} from "@/mixins/getMoreDetails";

export default {
  name: "RavelrySearchView",
  components: {RavelrySearch,},
  props: {
    authUser: {required: false}
  },
  mixins: [makeToast, getMoreDetails],
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