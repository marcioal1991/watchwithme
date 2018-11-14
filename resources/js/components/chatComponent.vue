<template>
    <div>
        <chat-view></chat-view>
    </div>
</template>

<script>
import chatView from '@/components/chat/chatView';

export default {
    name: 'chat-component',
    components: {
        chatView
    }
};
</script>