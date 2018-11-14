<template>
    <div>
        <div class="app-container" v-if="$store.state.user === null">
            <div class="container">                
                <div class="columns is-centered is-multiline has-text-centered">
                    <div class="is-full column">
                        <div class="content">
                            <p>Preencha seu nome e entre na sala</p>
                        </div>
                    </div>
                    <transition name='fade' tag="div">
                        <article v-if="showAlert" class="message is-danger">
                            <div class="message-header">
                                <p>O nome não pode estar vazio</p>
                                <button class="delete" aria-label="delete" @click="closeAlert"></button>
                            </div>
                        </article>
                    </transition>
                    <div class="is-full column">
                        <input placeholder="Seu nome" @keyup.enter="enter" class="input is-large is-rounded" type="text" v-model="name">
                    </div>
                    <div class="is-full column">
                        <button class="button is-primary" @click="enter" type="submit">Entrar na sala</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="container">
                <div class="columns">
                    <div class="column is-8">
                        <chat-component></chat-component>
                    </div>
                    <!-- <div class="column is-4">
                        <video-component></video-component>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import chatComponent from '@/components/chatComponent';
import videoComponent from '@/components/videoComponent';

export default {
    name: 'app',
    data() {
        return {
            name: '',
            showAlert: false
        };
    },
    components: {
        chatComponent,
        videoComponent
    },
    methods: {
        enter() {
            if (this.name == '') {
                this.showAlert = true;
                return;
            }
            this.showAlert = false;
            this.$store.commit('setName', this.name);
            this.$store.commit('setMeLikeUser', this.name);                
        },
        closeAlert() {
            this.showAlert = false;
        }

    }

};
</script>
<style>
body, html {
    background-color: rgb(240, 240, 240);
}
</style>

<style lang="scss" scoped>
    .app-container {
        margin: 0 auto;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
        opacity: 0;
    }
</style>
