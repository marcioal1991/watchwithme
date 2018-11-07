<template>
    <div class="content-grid">
        <div class="columns">
            <div class="column is-half">
                <chat-component></chat-component>
            </div>
            <div class="column is-half">
                <video-component></video-component>
            </div>
        </div>
    </div>
</template>

<script>

import chatComponent from '@/components/chatComponent';
import videoComponent from '@/components/videoComponent';

export default {
    name: 'app',
    components: {
        chatComponent,
        videoComponent
    }
};
</script>
<style>
body {
    background-color: rgb(195, 195, 195);
}
</style>

<style scoped>
    .content-grid {
        max-width: 1440px;
        margin: 0 auto;
        padding: 20px;
    }
</style>