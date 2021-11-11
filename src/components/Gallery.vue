<template>
    <div class="p-grid">
        <div v-for="(gallery, index) in galleries" :key = index class="p-col-3">
            <Card class="text-no-decoration">
                    <template #title>
                        <h3 class="text-no-decoration">{{gallery.name}}</h3>
                    </template>
                    <template #content>
                    <div>{{ gallery.keywords }}</div>
                    <div>{{ gallery.description }}</div>
                    </template>
                    <template #footer>
                        <div class="p-d-flex p-jc-between p-ai-center">
                            <Button class="p-button-danger" @click="$emit('delete', gallery.id)" style="z-index: 200">Delete</Button>
                            <Button class="p-button-secondary" @click="handleRedirect(gallery)">Go to gallery</Button>
                        </div>
                    </template>
            </Card>
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

<style>
  a {
    text-decoration: none !important;
  }
</style>