<template>
  <b-row>
    <b-col deck v-for="(yarn, i) in yarnCollection" :key="i" class="col-12 col-md-6 yarn-card-deck">
        <card-body class="my-3 yarn-card">
          <template v-slot:header>
            <b-card-title>{{yarn.name}}</b-card-title>
          </template>
          <template>
            <b-card-text>
              <p v-if="yarn.color">Color: {{yarn.color}}</p>
              <p>Length: {{yarn.length}}</p>
              <p>Weight: {{yarn.weight}}</p>
              <p v-if="yarn.fiber">Fiber type: {{yarn.fiber}}</p>
            </b-card-text>
          </template>
          <template v-slot:footer>
            <b-row>
              <b-col>
                <b-button @click="removeYarn">Delete Yarn</b-button>
              </b-col>
            </b-row>
          </template>
        </card-body>
    </b-col>
  </b-row>
</template>

<script>
import {db} from "@/firebase";
import CardBody from "@/components/CardBody";

export default {
  name: "YarnList",
  components: {CardBody},
  data() {
    return {
      yarnCollection: []
    }
  },
  firestore: {
    yarnCollection: db.collection('yarn')
  },
  methods: {
    removeYarn() {
      // remove image from storage
      // remove yarn from database
    }
  }
}
</script>

<style scoped>
/*.yarn-card-deck {*/
/*  width: 300px;*/
/*}*/
.yarn-card {
  border-color: #17a2b8;
}
.yarn-card .card-body header {
  background-color: #17a2b8;
  color: white;
}
</style>