<template>
    <div class="chat-container columns">
        <div class="chat-users column is-one-quarter">
            <chat-user :name="user.name" :background-color="user.bgColor" :text-color="user.txtColor"></chat-user>
        </div>
        <div class="chat-view-text-wrapper">
            <div class="chat-view-text">
                <chat-text></chat-text>
            </div>
        </div>
        <div class="chat-writting-box">
            <chat-writting></chat-writting>
        </div>
        <div>
            <chat-writter-box></chat-writter-box>
        </div>
    </div>
</template>

<script>
import chatUser from '@/components/chat/chatUser';
import chatText from '@/components/chat/chatText';
import chatWritterBox from '@/components/chat/chatWritterBox';
import chatWritting from '@/components/chat/chatWritting';

export default {
    name: 'chat-view',
    computed: {
        users() {
            return this.$store.users.map((user) => {
                return {
                    name: user.getName(),
                    bgColor: user.getBgColor(),
                    txtColor: user.getTxtColor(),
                };
            })
        }
    },
    components: {
        chatUser,
        chatText,
        chatWritterBox,
        chatWritting
    }
};
</script>

<style scoped>
.chat-container {
    position: relative;
    
}

.chat-container .chat-users {
    
}
</style>
