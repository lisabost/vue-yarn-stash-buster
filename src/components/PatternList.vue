<template>
  <b-row>
    <b-card-group deck v-for="(pattern, i) in patterns" :key="i" class="col-12 col-md-3">
      <card-body>
        <template>
          <b-card-img :src="pattern.first_photo.medium_url" :alt="pattern.name"></b-card-img>
          <b-card-title>{{pattern.name}}</b-card-title>
          <b-card-sub-title>Designer: {{pattern.designer.name}}</b-card-sub-title>
        </template>
      </card-body>
    </b-card-group>
  </b-row>
</template>

<script>
import CardBody from "@/components/CardBody";
export default {
  name: "PatternList",
  components: {CardBody},
  props: {
    patterns: {type: Array}
  }
}
</script>

<style scoped>

</style>