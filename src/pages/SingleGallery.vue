<template>
<div>
    <div class="p-p-5 p-mb-5 hero-section-wrapper">
        <div class="p-d-flex p-ai-end p-jc-center">
            <h1 class="p-mr-4 gallery-name">{{ gallery.name }}</h1>
        </div>
        <div class="p-text-italic p-text-center p-mb-3"><span class="text-muted">Created: {{ gallery.created_at }}</span></div>
         <div class="p-text-italic p-text-center p-mb-3"><span class="p-text-bold">Description:</span> &nbsp; {{ gallery.description }}</div>
        <div class="p-text-center">
            <div class="p-text-italic"><span class="p-text-bold">Keywords:</span> &nbsp; {{ gallery.keywords }}</div>
        </div>
        <Button class="p-button-rounded edit-gallery-btn p-button-secondary" @click="openUpdateForm()" label="Edit" icon="pi pi-pencil" />
    </div>

    <!-- Update Modal -->
    <Dialog :visible.sync="displayModal"  :style="{width: '450px'}" :modal="true">
        <template #header>
            <h1>Edit A Gallery</h1>
        </template>
        <CreateGalleryForm @saved="updateGallery" :gallery="gallery" ></CreateGalleryForm>
    </Dialog>

    <div class="p-px-5">
        <FileUpload ref="image_uploaded" :auto="true" class="p-mb-5" chooseLabel="Upload" name="file[]" accept="image/*" mode="basic" :customUpload="true" @uploader="uploadPhoto($event)" />

        <div class="p-grid">
            <div v-for="(file, index) in files" :key="index" class="p-col-3">
                <div class="image-wrapper">
                    <ImagePreview className="p-d-block" :src="'http://localhost:8080' + file.filename" 
                    alt="Gallery image" preview width="100%" height="250" />
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-danger image-delete-btn" @click="deletPicture(file.id)" />
                </div>
            </div>
        </div>

        <div v-if="files.length === 0">
            <h4>You don't have any pictures uploaded to this gallery yet</h4>
        </div>
    </div>
    <ConfirmDialog></ConfirmDialog>
</div>
</template>

<script>
import CreateGalleryForm from '../components/CreateGalleryForm.vue';
import moment from 'moment';
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
        this.$api.get('/gallery/' + this.id).then(res => {
            res.data.created_at = moment(res.data.created_at).format('D-M-Y H:M a');
            this.gallery = res.data;
        });
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
        const file = event.files[0];
        const form = new FormData();
        form.append('file', file);
        form.append('gallery_id', this.id);
        this.$api.post('upload', form).then(() => {
            this.$refs.image_uploaded.clear();
            this.fetchGalleryPictures()
        });
    },
    deletPicture(id) {
        this.$confirm.require({
            message: 'Are you sure you want to delete this gallery?',
            header: 'Delete Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptClass: 'p-button-danger',
            accept: () => {
                this.$api.post('/picture/delete/' + id).then(() =>         this.fetchGalleryPictures());
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

<style scoped>
    .image-wrapper {
        position: relative;
    }

    .image-delete-btn {
        position: absolute;
        top: 5%;
        right: 5%;
    }

    .gallery-name {
        margin-bottom: 0;
    }

    .text-muted {
        color: #6c757d;
    }

    .hero-section-wrapper {
        position: relative;
    }

    .edit-gallery-btn {
        position: absolute;
        right: 5%;
        bottom: 10%;
    }
</style>