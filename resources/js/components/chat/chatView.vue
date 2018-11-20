<template>
    <div class="chat-container columns">
        <div class="chat-users column is-one-quarter">
            <chat-user :key="user.name" v-for="user in users" :name="user.name" :bg-color="user.bgColor" :txt-color="user.txtColor" :is-writting="user.isWritting"></chat-user>
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
            
            return this.$store.state.users.map((user) => {
                
                let data = {
                    name: user.name,
                    bgColor: user.colors.bgColor,
                    txtColor: user.colors.txtColor,
                    isWritting: this.$store.state.usersWritting.filter(userW => userW.id === user.id) > 0
                };

                return data;


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
.chat-view-text-wrapper {
    height: 300px;
}
.chat-view-text {
    max-height: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;  
}
</style>
