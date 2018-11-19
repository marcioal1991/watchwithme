<template>
    <div class="columns is-clearfix is-multiline">
        <div v-for="message in $store.state.messages" 
            :key="message.message + message.user.name"            
            class="column is-full">
            <div class="chat-text" :class="boxClass(message)">
                <i style="font-size: 0.8em">{{ message.user.name}}</i>
                <p v-if="message.image == null">{{ message.message }}</p>
                <p v-else>
                    <img :src="message.image.url" alt="">
                    <br>
                    {{ message.image.type }}
                    <br>
                    {{ message.image.name }}
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'chat-text',
    methods: {
        boxClass(message) {            
            if (message.user === this.$store.state.user) {
                return ['is-pulled-right', 'has-background-info', 'has-text-white'];
            } else {
                return ['is-pulled-left', 'has-background-light', 'has-text-dark'];
            }
        }
    }
}
</script>
<style scoped>
.chat-text {
    padding: 10px;
    width: auto;
    max-width: 50%;
}
</style>
