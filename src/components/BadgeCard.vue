<template>
  <b-row class="badges">
    <b-col>
      <b-img fluid :src="badge"></b-img>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "BadgeCard",
  components: {},
  props: {
    badge: {type: String},
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped>
.badges img {
  max-height: 200px;
}
</style>