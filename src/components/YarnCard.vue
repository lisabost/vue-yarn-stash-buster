<template>
  <card-body>
    <template v-slot:header>
      <b-card-title>{{yarn.name}}</b-card-title>
    </template>
    <template>
      <b-card-text class="mt-2">
        <b-row>
          <b-col md="6" class="d-flex flex-column">
            <b-img :src="yarn.image" :alt="yarn.name" class="m-3"></b-img>
          </b-col>
          <b-col md="6" class="d-flex flex-column mt-3">
            <p v-if="yarn.color">Color: {{yarn.color}}</p>
            <p>Length: {{yarn.length}} yards</p>
            <p>Weight: {{yarn.weight}}</p>
            <p v-if="yarn.fiber">Fiber type: {{yarn.fiber}}</p>
          </b-col>
        </b-row>
      </b-card-text>
    </template>
    <template v-slot:footer>
      <b-row class="yarn-button-row d-flex flex-row justify-content-around">
        <b-button @click="findAPattern(yarn)" class="my-3">Find a Pattern!</b-button>
        <yarn-modal :auth-user="authUser" :ok-button-text="'Edit Yarn'" :currently-editing="true"
                    :yarn="yarn" :modalId="getModalId" :yarnId="yarn.id" class="ml-3">Edit Yarn</yarn-modal>
        <b-button class="btn-danger my-3 delete-button float-right ml-3" @click="removeYarn">Delete Yarn</b-button>
      </b-row>
    </template>
  </card-body>
</template>

<script>
import CardBody from "@/components/CardBody";
import {db, storage} from "@/firebase";
import YarnModal from "@/components/YarnModal";
import {makeToast} from "@/mixins/makeToast";
export default {
  name: "YarnCard",
  data() {
    return {
    }
  },
  components: {YarnModal, CardBody},
  props: {
    yarn: {type: Object, required: true},
    authUser: {required: true},
  },
  mixins: [makeToast],
  methods: {
    removeYarn() {
      // remove image from storage
      if(this.yarn.image) {
        storage.child('yarn').child(this.yarn.id)
            .delete()
            .catch(error => {
              console.error('Error deleting yarn', error)
              this.makeToast('Error deleting yarn', 'Error!', 'danger');
            });
      }
      // remove yarn from database
      db.collection('crafters').doc(this.authUser.uid).collection('yarn')
        .doc(this.yarn.id)
        .delete()
        .catch(error => {
          console.error('Error deleting yarn', error);
          this.makeToast('Error deleting yarn', 'Error!', 'danger');
        })
    },
    findAPattern(yarn) {
      console.log('The yarn I clicked on is: ' + yarn)
      this.$router.push({name: 'search', params: {searchWithYarn: yarn}})
    },
  },
  computed: {
    getModalId() {
      return 'edit-yarn' + this.yarn.id;
    }
  }
}
</script>

<style scoped>
.yarn-button-row {
  margin-right: 0;
  margin-left: 0;
  font-family: 'Quicksand', sans-serif;
}
</style>