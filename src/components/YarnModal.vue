<template>
  <div class="create-yarn-modal">
    <b-button @click="$bvModal.show(modalId)" class="btn-primary my-3"><slot></slot></b-button>
    <b-modal scrollable centered @ok.prevent="createOrEditYarn" :ok-title="okButtonText" title="Add Yarn to Stash" :id="modalId">
      <template>
        <b-form validated>
          <b-form-group label="Yarn Name:" label-for="name">
            <b-form-input id="name" v-model="newYarn.yarn.name" required></b-form-input>
            <b-form-invalid-feedback>Yarn name is required</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label="Length in Yards:" label-for="yardage">
            <b-form-input id="yardage" type="number" min="0" v-model="newYarn.yarn.length" required></b-form-input>
            <b-form-invalid-feedback>Yarn length must be greater than 0</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label="Color: " label-for="color">
            <b-form-input id="color" v-model="newYarn.yarn.color"></b-form-input>
          </b-form-group>
          <b-form-group label="Yarn Weight:" label-for="weight">
            <b-form-select id="weight" :options="options" v-model="newYarn.yarn.weight" required></b-form-select>
            <b-form-invalid-feedback>Yarn weight is required.</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label="Type of Fiber:" label-for="fiber">
            <b-form-input id="fiber" v-model="newYarn.yarn.fiber"></b-form-input>
          </b-form-group>
          <b-form-group label="Image:" label-for="image">
            <b-form-file id="image" v-model="newYarn.yarn.image" ref="newImage"></b-form-file>
          </b-form-group>
        </b-form>
      </template>
    </b-modal>
  </div>
</template>

<script>
import {db, storage} from "@/firebase";
import Yarn from "@/models/Yarn";
import {makeToast} from "@/mixins/makeToast";

export default {
  name: "YarnModal",
  props: {
    okButtonText: {type: String},
    modalId: {type: String},
    currentlyEditing: {type: Boolean},
    yarnId: {type: String},
    yarn: {type: Object},
    authUser: {required: true},
  },
  data() {
    return {
      // modalId: 'add-yarn-modal',
      options: [
        {value: null, text: 'Select a yarn weight'},
        {value: 'lace', text: 'Lace'},
        {value: 'fingering', text: 'Fingering/Sock'},
        {value: 'sport', text: 'Sport/Baby'},
        {value: 'dk', text: 'DK/Light Worsted'},
        {value: 'worsted', text: 'Worsted/Aran'},
        {value: 'bulky', text: 'Bulky/Chunky'},
        {value: 'roving', text: 'Bulky/Roving'},
        {value: 'jumbo', text: 'Jumbo'},
      ],
      newYarn: {
        yarn: this.yarn ?? new Yarn(),
        image: null,
      },
      message: '',

    }
  },
  mixins: [makeToast],
  methods: {
    createOrEditYarn() {
      if(this.currentlyEditing) {
        this.editYarn();
      }
      else {

        this.saveNewYarn();
      }
    },
    saveNewYarn() {
      // Add yarn to stash
      db.collection('crafters').doc(this.authUser.uid).collection(Yarn.collectionName)
        .add(this.newYarn.yarn.toFirestore())
        .then(docRef => {
          console.log('Yarn added', docRef)
          this.makeToast('Yarn added', 'Success!', 'success')

          // add the image to storage
          this.addImage(docRef.id);

          // clear the form
          this.newYarn.yarn = new Yarn();
          // close modal
          this.$bvModal.hide(this.modalId);
        })
        .catch(error => {
          console.log('Error adding yarn', error)
          this.makeToast('Error adding yarn', 'Error', 'danger')
        });
    },
    addImage(docId){
      // docId and image file are required
      if(!docId || !this.newYarn.image){
        return false;
      }

      let theYarn = this.newYarn;
      let allowedTypes = ['jpg', 'png', 'gif'];
      let extension = theYarn.image.name.toLowerCase().split('.').pop()

      // validate extension
      if(allowedTypes.indexOf(extension) < 0){
        // invalid extension

        // let the user know...
        this.makeToast('Invalid file type.', 'Error', 'danger');

        return false;
      }

      // validate size (less than 200KB
      if(theYarn.image.size > (200 * 1024)){
        // file too large

        // let the user know...
        this.makeToast('File too large. 200KB max', 'Error!', 'danger');

        return false;
      }

      // add image to firebase
      storage.child('yarn').child(docId)
          .put(this.newYarn.image)
          .then(snapshot => {
            console.log('Image added ', snapshot);

            // clear the form
            this.newYarn.image = null;

            // get the image url to update the yarn document
            return snapshot.ref.getDownloadURL();
          })
          .then(url => db.collection('crafters').doc(this.authUser.uid).collection('yarn').doc(docId).update({image: url}))
          .then(docRef => console.log('Yarn Updated', docRef))
          .catch(error => {
            console.error('Error updating yarn' , error, )

            // let user know error
            this.makeToast('Error updating yarn', 'Error', 'danger')
          })
    },
    editYarn() {
      // update the document
      db.collection('crafters').doc(this.authUser.uid).collection(Yarn.collectionName).doc(this.yarnId)
          .update(this.newYarn.yarn.toFirestore())
          .then(docRef => {
            console.log('Yarn updated', docRef)

            //update the image - delete and then add new one
            storage.child('/yarn').child(this.yarnId)
                .delete()
                .catch(error => {
                  console.error('Error deleting yarn', error)
                  this.makeToast('Error deleting yarn', 'Error!', 'danger');
                });
            storage.child('/yarn').child(this.yarnId)
              .put(this.newYarn.image)
              .then(snapshot => {
                console.log('Image updated', snapshot)

                //clear form
                this.newYarn.image = null;

                // get the image url to update the yarn document
                return snapshot.ref.getDownloadURL();
              })
              .then(url => db.collection('crafters').doc(this.authUser.uid).collection('yarn').doc(this.yarnId).update({image: url}))
              .then(docRef => console.log('Yarn Updated', docRef))
              .catch(error => {
                console.error('Error updating image' , error)

                // let user know error
                this.makeToast('Error updating yarn', 'Error', 'danger')
              })

            this.makeToast(' Yarn Updated: Imaged Changed/Added', 'Image Added!', 'success')
          })

      //report success
      this.makeToast('Yarn edited successfully!', 'Success!', 'success')
    },
  },
  computed: {
  }
}
</script>

<style scoped>

</style>