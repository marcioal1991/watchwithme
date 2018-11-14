<template>
    <div class="chat-container columns">
        <div class="chat-users column is-one-quarter">
            <chat-user :key="user.getName()" v-for="user in $store.state.users" :name="user.getName()" :bg-color="user.getBgColor()" :txt-color="user.getTxtColor()"></chat-user>
        </div>
        <div class="column is-three-quarter">
            <div class="chat-view-text-wrapper box">
                <div class="chat-view-text">
                    <chat-text></chat-text>
                </div>
            </div>
            <div class="chat-writting-box">
                <chat-writting></chat-writting>
            </div>
            <div class="chat-writter-box">
                <chat-writter-box></chat-writter-box>
            </div>
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
    },
    props: ['user']
};
</script>

<style scoped>
.chat-container {
    position: relative;
    
}
.chat-view-text-wrapper {
    height: 300px;
}
</style>
