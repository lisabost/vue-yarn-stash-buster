<template>
  <card-body>
    <template v-slot:header>
      <b-card-title>{{yarn.name}}</b-card-title>
    </template>
    <template>
      <b-card-text class="mt-2">
        <b-row>
          <b-col md="6" class="d-flex flex-column">
            <b-img :src="yarn.image" :alt="yarn.name"></b-img>
          </b-col>
          <b-col md="6" class="d-flex flex-column">
            <p v-if="yarn.color">Color: {{yarn.color}}</p>
            <p>Length: {{yarn.length}} yards</p>
            <p>Weight: {{yarn.weight}}</p>
            <p v-if="yarn.fiber">Fiber type: {{yarn.fiber}}</p>
          </b-col>
        </b-row>
      </b-card-text>
    </template>
    <template v-slot:footer>
      <b-row>
        <b-col>
          <yarn-modal :ok-button-text="'Edit Yarn'" :currently-editing="true" :modalId="getModalId" :yarnId="yarn.id">Edit Yarn</yarn-modal>
        </b-col>
        <b-col>
          <b-button class="btn-danger delete-button" @click="removeYarn">Delete Yarn</b-button>
        </b-col>
      </b-row>
    </template>
  </card-body>
</template>

<script>
import CardBody from "@/components/CardBody";
import {db, storage} from "@/firebase";
import YarnModal from "@/components/YarnModal";
export default {
  name: "YarnCard",
  data() {
    return {
    }
  },
  components: {YarnModal, CardBody},
  props: {
    yarn: {type: Object, required: true}
  },
  methods: {
    removeYarn() {
      console.log(this.yarn);
      // remove image from storage
      if (storage.child('yarn').child(this.yarn.id)) {
        storage.child('yarn').child(this.yarn.id)
            .delete()
            .catch(error => {
              console.error('Error deleting yarn', error)
              this.makeToast('Error deleting yarn', 'Error!', 'danger');
            });
      }
      // remove yarn from database
      db.collection('yarn')
        .doc(this.yarn.id)
        .delete()
        .catch(error => {
          console.error('Error deleting yarn', error);
          this.makeToast('Error deleting yarn', 'Error!', 'danger');
        })
    },
    makeToast(message, title, color) {
      this.$bvToast.toast(message), {
        title: title,
        autoHideDelay: 3000,
        variant: color
      }
    }
  },
  computed: {
    getModalId() {
      return 'edit-yarn' + this.yarn.id;
    }
  }
}
</script>

<style scoped>
.delete-button {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>