<template>
    <div class="chat-user-container">
        <div class="chat-user-icon" :class="{'chat-user-talking': isTalking}" :style="{backgroundColor: backgroundColor, color: color}">
            {{ accronym }}
        </div>

        <div class="chat-user-name">
            <div class="notification">
                {{ name }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'chat-user',
    props: {
        isTalking: {
            type: Boolean,
            default: false
        },
        txtColor: {
            type: String,
            default: "#fff"
        },
        bgColor: {
            type: String,
            default: "#000"
        },
        name: {
            type: String,
            required: true
        }
    },
    computed: {
        accronym() {
            return this.name.split(' ').map((word) => {
                return word.charAt(0);
            }).join('').toUpperCase();
        },
        backgroundColor() {
            return this.bgColor;
        },
        color() {
            return this.txtColor
        }
    }

}
</script>

<style scoped>
.chat-user-container {
    display: flex;
    margin-bottom: 10px;
}

.chat-user-container:last-child {
    margin-bottom: 0;
}

.chat-user-container .chat-user-icon {
    font-size: 30px;
    margin-right: 10px;
    height: 60px;
    width: 60px;
    padding: 7px 0;
    transition: transform 0.5s ease, opacity 0.5s ease;
    text-align: center;
    opacity: 0.7;
    will-change: opacity, transform;
    border-radius: 100%;
    transform: scale(1);
}
.chat-user-container .chat-user-icon.chat-user-talking {
    transform: scale(1.05);
    opacity: 1;
}
</style>
