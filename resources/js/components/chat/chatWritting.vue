<template>
    <div class="columns">
        <div v-if="usersNames.length > 0" class="column is-full">
            {{ writtingText }}
        </div>
    </div>
</template>
<script>
export default {
    name: 'chat-writting',
    computed: {
        usersNames() {
            return this.$store.state.usersWritting.map((user) => {
                return user.name;
            });
        },
        writtingText() {
            if (this.usersNames.length > 1) {
                return `${this.usersNames.join(', ')} estão digitando...`
            } 

            return `${this.usersNames.join(',')} está digitando...`;
        }
    }
}
</script>
