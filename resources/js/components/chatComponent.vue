<template>
    <div>
        <chat-view></chat-view>
        <chat-writter-box></chat-writter-box>
    </div>
</template>

<script>
import chatView from '@/components/chat/chatView';
import chatWritterBox from '@/components/chat/chatWritterBox';

export default {
    name: 'chat-component',
    components: {
        chatView,
        chatWritterBox
    }
};
</script>