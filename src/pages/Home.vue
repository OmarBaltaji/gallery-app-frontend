<template>
  <div class="p-p-5 m-m-5">
      <!-- <FileUpload name="demo[]" url="./upload" accept="image/*" @uploader="uploadImage">
      </FileUpload> -->
    <Button @click="openCreateForm()" class="p-mb-5">Create Gallery</Button>

    <Dialog :visible.sync="displayModal"  :style="{width: '40vw'}" :modal="true">
        <template #header>
            <h3>Create a gallery</h3>
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
        uploadImage(event) {
            if (event.target.files && event.target.files[0]) {
                const prefixFiletype = event.target.files[0].type.toString()
                if (prefixFiletype.indexOf('image/') !== 0) {
                    alert('This file is not an image');
                    document.getElementById('input_file').value = '';
                    return
                }
            } else {
                alert('Something wrong with input file');
            }

            const formData = new FormData();
            formData.append('picture', event.target.files[0]);

            // this.$api.post('/upload', )
        },
        fetchUserGalleries() {
            this.$api.get('/gallery').then(res => {
                console.log(res.data);
                this.galleries = res.data;
            });
        },
        fetchUser() {
            this.$api.get('/user').then(res => {
                console.log(res);
            })
        },
        newGallery() {
            this.displayModal = false;
            this.fetchUserGalleries();
        },
        // createGallery() {
        //     const form = new FormData();
        //     form.append('name', this.name);
        //     form.append('keywords', this.keywords);
        //     form.append('description', this.description);
        //     form.append('user_id', 1);
        //     console.log(this.description);
        //     console.log(this.keywords);

        //     this.$api.post('/gallery', form).then(res => {
        //         this.displayModal = false;
        //         this.clearForm();
        //         this.fetchUserGalleries();
        //         console.log(res)
        //     });
        // },
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