<template>
    <div>
        <div class="p-p-5 p-d-flex p-ai-center">
            <div class="p-mr-5">
                <h1>{{ gallery.name }}</h1>
                <h2>{{ gallery.description }}</h2>
                <h3>{{ gallery.keywords }}</h3>
            </div>
            <div>
                <Button @click="openUpdateForm()">Edit</Button>
            </div>
            <Dialog :visible.sync="displayModal"  :style="{width: '40vw'}" :modal="true">
                <template #header>
                    <h3>Update a gallery</h3>
                </template>
                <CreateGalleryForm @saved="updateGallery" :gallery="gallery" ></CreateGalleryForm>
            </Dialog>
        </div>
        <div class="p-p-5">
            <FileUpload name="file[]" accept="image/*" mode="basic" :auto="true" :customUpload="true" @uploader="uploadPhoto($event)" />

            <div v-for="(file, index) in files" :key="index">
                <img :src="'http://localhost:8080' + file.filename" > 
                <Button class="p-button-danger" @click="deletPicture(file.id)">Delete</Button>
            </div>
        </div>
        <ConfirmDialog></ConfirmDialog>
    </div>
</template>

<script>
import CreateGalleryForm from '../components/CreateGalleryForm.vue';
export default {
    data() {
        return {
            gallery: {},
            displayModal: false,
            id: '',
            files: []
        }
    },
    methods: {
        fetchSingleGallery() {
            this.id = this.$route.params.id;
            this.$api.get('/gallery/' + this.id).then(res => this.gallery = res.data);
        },
        openUpdateForm() {
            this.displayModal = true;
        },
        updateGallery() {
            this.displayModal = false;
            this.fetchSingleGallery();
        },
        fetchGalleryPictures() {
            const form = new FormData();
            form.append('gallery_id', this.id);
            this.$api.post('/picture', form).then(res => this.files = res.data);
        },
        uploadPhoto(event) {
            console.log(event);
            const file = event.files[0];
            const form = new FormData();
            form.append('file', file);
            form.append('gallery_id', this.id);
            this.$api.post('upload', form).then(() => this.fetchGalleryPictures());
        },
        deletPicture(id) {
            this.$confirm.require({
                message: 'Are you sure you want to delete this gallery?',
                header: 'Delete Confirmation',
                icon: 'pi pi-exclamation-triangle',
                acceptClass: 'p-button-danger',
                accept: () => {
                    this.$api.post('/picture/delete/' + id).then(() => console.log('image deleted'));
                    this.fetchGalleryPictures();
                },
                reject: () => {
                    // empty
                }
            });
        }
    },
    created() {
        this.fetchSingleGallery();
        this.fetchGalleryPictures();
    },
    components: {CreateGalleryForm}
}
</script>

<style>

</style>