
<template>
    <div class="is-clearfix">
        <form @submit.prevent="sendMessage">
            <div class="field">
                <div class="control">
                <textarea class="textarea is-success" placeholder="Digite a mensagem" v-model="message"></textarea>
                </div>
            </div>
            <button type="submit" :disabled="message == ''" class="button is-primary is-pulled-right">Enviar messagem</button>
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            message: ''
        };
    },
    name: 'chat-writter-box',
    methods: {
        sendMessage(e) {        
            this.$store.dispatch({
                type:'sendMessage',
                message: this.message
            });

            this.message = '';
        }        
    }
}
</script>
