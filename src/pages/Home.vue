<template>
  <div class="p-p-5 m-m-5">
      <!-- <FileUpload name="demo[]" url="./upload" accept="image/*" @uploader="uploadImage">
      </FileUpload> -->
    <Button @click="openCreateForm()" class="p-mb-5 p-button-rounded" label="Create Gallery" icon="pi pi-plus-circle" />

    <!-- Create Modal -->
    <Dialog :visible.sync="displayModal"  :style="{width: '450px'}" :modal="true">
        <template #header>
            <h1>Create A Gallery</h1>
        </template>
        <CreateGalleryForm @saved="newGallery"></CreateGalleryForm>
    </Dialog>

    <Gallery :galleries="galleries" @delete="deleteGallery" />
    <ConfirmDialog></ConfirmDialog>
  </div>
</template>

<script>
import Gallery from '../components/Gallery.vue';
import CreateGalleryForm from '../components/CreateGalleryForm.vue';
export default {
    data() {
        return {
            displayModal: false,
            galleries: [],
        }
    },
    methods: {
        fetchUserGalleries() {
            this.$api.get('/gallery').then(res => {
                console.log(res.data);
                this.galleries = res.data;
            });
        },
        fetchUser() {
            this.$api.get('/user').then(res => {
                console.log(res.data);
            })
        },
        newGallery() {
            this.displayModal = false;
            this.fetchUserGalleries();
        },
        openCreateForm() {
            this.displayModal = true;
        },
        deleteGallery(id) {
            // const confirmDelete = confirm('Are you sure you want to delete this gallery?');
            this.$confirm.require({
                message: 'Are you sure you want to delete this gallery?',
                header: 'Delete Confirmation',
                icon: 'pi pi-exclamation-triangle',
                acceptClass: 'p-button-danger',
                accept: () => {
                   this.$api.delete('/gallery/' + id).then(res => console.log(res));
                    this.fetchUserGalleries();
                },
                reject: () => {
                    // empty
                }
            });
        }
    },
    created() {
        const token = this.$cookies.get('access_token');
        if (!token) {
            this.$router.push('/signin');
            return null;
        }

        this.fetchUser();
        this.fetchUserGalleries();
    },
    components: {Gallery, CreateGalleryForm}
}
</script>

<style>

</style>