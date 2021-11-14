<template>
    <form @submit.prevent="createGallery()">
        <div class="p-fluid">
            <Message severity="error" v-if="errorMessage" :closable="false" :key="errorMessage">{{ errorMessage }}</Message>
            <div class="p-field">
                <InputText placeholder="Gallery Name" name="name" type="text" id="name" maxlength="20" v-model="name" />
            </div>
            <div class="p-field">
                <InputText placeholder="Keywords" name="keywords" type="text" id="keywords" v-model="keywords" />
            </div>
            <div class="p-field">
                <Textarea name="description" placeholder="Description" v-model="description" rows="5" style="{width: 100%}"/>
            </div>

            <Button label="Submit" class="p-text-center" type="submit" :disabled="!name || !keywords" />
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
            errorMessage: null,
        }
    },
    props: ['gallery'],
    methods: {
        createGallery() {
            const form = new FormData();
            form.append('name', this.name);
            form.append('keywords', this.keywords);
            form.append('description', this.description);

            if(this.gallery?.id) {
                this.$api.post('/gallery/update/' + this.gallery.id, form).then(res => {
                    this.clearForm();
                    console.log(res);
                }).catch(err => {
                    this.errorMessage = err.response.data.messages.error;
                    console.log(err.response);
                });
            } else {
                this.$api.post('/gallery', form).then(res => {
                    this.clearForm();
                    console.log(res)
                }).catch(err => {
                    this.errorMessage = err.response.data.messages.error;
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