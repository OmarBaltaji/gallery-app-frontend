<template>
    <form @submit.prevent="createGallery()">
        <div class="p-fluid">
            <div class="p-field">
                <span class="p-float-label">
                    <InputText name="name" type="text" id="name" v-model="name" />
                    <label for="name">Gallery Name</label>
                </span>
            </div>
            <div class="p-field">
                <span class="p-float-label">
                    <InputText name="keywords" type="text" id="keywords" v-model="keywords" />
                    <label for="keywords">Keywords</label>
                </span>
            </div>
            <div class="p-field">
                <span class="p-float-label">
                    <Textarea name="description" v-model="description" rows="5" style="{width: 100%}"/>
                    <label for="description">Description</label>
                </span>
            </div>

            <Button type="submit" :disabled="!name || !keywords">Submit</Button>
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            keywords: '',
            description: '',
        }
    },
    props: ['gallery'],
    methods: {
        createGallery() {
            const form = new FormData();
            form.append('name', this.name);
            form.append('keywords', this.keywords);
            form.append('description', this.description);

            if(this.gallery.id) {
                this.$api.post('/gallery/update/' + this.gallery.id, form).then(res => {
                    this.clearForm();
                    console.log(res);
                });
            } else {
                this.$api.post('/gallery', form).then(res => {
                    this.clearForm();
                    console.log(res)
                });
            }

        },
        clearForm() {
            this.name = '';
            this.keywords = '';
            this.description = '';

            this.$emit('saved');
        },
    },
    created() {
        if(this.gallery) {
            this.name = this.gallery.name;
            this.keywords = this.gallery.keywords;
            this.description = this.gallery.description;
        }
    }
}
</script>

<style>

</style>