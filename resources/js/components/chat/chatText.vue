<template>
    <div class="columns is-clearfix is-multiline">
        <div v-for="message in $store.state.messages" 
            :key="message.getMessage() + message.getUser().getName()"            
            class="column is-full">
            <p class="chat-text" :class="boxClass(message)">{{ message.getMessage() }}</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'chat-text',
    methods: {
        boxClass(message) {            
            if (message.getUser() === this.$store.state.user) {
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
