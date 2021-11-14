<template>
    <div class="p-grid">
        <div v-for="(gallery, index) in galleries" :key = index class="p-col-3">
            <Card class="rounded-card">
                    <template #title>
                        <h3 class="p-text-primary">{{gallery.name}}</h3>
                    </template>
                    <template #footer>
                        <div class="p-d-flex p-jc-between p-ai-center">
                            <Button class="p-button-secondary p-button-rounded" icon="pi pi-folder-open" @click="handleRedirect(gallery)" label="Open" />
                            <Button class="p-button-danger p-button-rounded gallery-delete-btn" icon="pi pi-trash" @click="$emit('delete', gallery.id)" />
                        </div>
                    </template>
            </Card>
        </div>
        <div v-if="galleries.length === 0" class="p-px-2">
            <h3>You don't have any galleries yet</h3>
        </div>
    </div>
</template>

<script>
export default {
    props: ['galleries'],
    methods: {
        handleRedirect(gallery) {
            this.$router.push({
                path: '/gallery/' + gallery.id,
                params: { data: gallery }
            });
        }
    }
}
</script>

<style scoped>
  a {
    text-decoration: none !important;
  }

  .p-card {
    background: url('../assets/2059714-200.png') center center no-repeat !important;
    background-color: #d2d2d2  !important;
    position: relative;
  }

  .gallery-delete-btn {
    position: absolute;
    top: 5%;
    right: 5%;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 130px;
  }
</style>