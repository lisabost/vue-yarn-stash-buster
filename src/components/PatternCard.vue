<template>
  <card-body>
    <template v-slot:header>
      <slot name="pattern-card-header"></slot>
    </template>
    <template v-slot:body>
      <b-card-img class="pattern-image" :src="item.first_photo.medium_url" :alt="item.name"></b-card-img>
      <b-card-sub-title class="p-3">Designer: {{item.pattern_author.name}}</b-card-sub-title>
      <slot name="user-yarn-details"></slot>
    </template>
    <template v-slot:footer>
      <slot name="pattern-card-footer"></slot>
    </template>
  </card-body>
</template>

<script>
import CardBody from "@/components/CardBody";

export default {
  name: "PatternCard",
  components: {CardBody},
  props: {
    item: Object,
    authUser: {required: false},
  },
  methods: {

  },
  computed: {

  }
}
</script>

<style scoped>
.pattern-image {
  height: 200px;
  object-fit: cover;
}
</style>