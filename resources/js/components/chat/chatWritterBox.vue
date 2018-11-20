
<template>
    <div class="is-clearfix">
        <form @submit.prevent="sendMessage">
            <div class="field">
                <div class="control">
                <textarea class="textarea is-success" placeholder="Digite a mensagem" v-model="message"></textarea>
                </div>
            </div>
            <button style="margin-left:10px" type="submit" :disabled="message == ''" class="button is-primary is-pulled-right">Enviar messagem</button>
            <label class="button is-primary is-pulled-right">
                Enviar imagem
                <input ref="file" type="file" accept="image/*" style="visibility:hidden; position: absolute; top: -99999999999; left: -99999999990" v-on:change="imageFileChange">
            </label>

            <label class="button is-primary is-pulled-right">
                Enviar video
                <input ref="file" type="file" accept="video/*" style="visibility:hidden; position: absolute; top: -99999999999; left: -99999999990" v-on:change="videoFileChange">
            </label>
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
        imageFileChange(event) {
            if (event.target.files.length > 0) {
                const file = event.target.files[0];
                const fr = new FileReader();
                    
                fr.onload = (e) => {
                    const image = new Image();
                    image.src = e.target.result;
                    image.onload = () => {
                        const canvas = document.createElement('canvas');
                        const context = canvas.getContext('2d');
                        
                        canvas.width = image.width;
                        canvas.height = image.height;
                        context.drawImage(image, 0, 0);
    
                        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                        
                        for( let i =0; i < imageData.data.length; i += 4) {
                            imageData.data[i] = imageData.data[i] ^ 255;
                            imageData.data[i+1] = imageData.data[i+1] ^ 255;
                            imageData.data[i+2] = imageData.data[i+2] ^ 255;
                        }
    
                        context.putImageData(imageData,0,0);
                        this.$store.dispatch({
                            type: 'addImage',
                            image: canvas.toDataURL(),
                            original: image.src,
                            filename: file.name,
                            filetype: file.type
                        });
                    }
                };

                // fr.readAsArrayBuffer(file);
                fr.readAsDataURL(file);
            }
        },
        videoFileChange(event) {
            if (event.target.files.length > 0) {
                const file = event.target.files[0];
                // const fr = new FileReader();
                    this.$store.dispatch({
                        type: 'sendVideo',
                        video: file
                    }); 
                    
                // fr.onload = (e) => {                    
                // };

                // fr.readAsArrayBuffer(file);
            }
        },
        sendMessage(e) {        
            this.$store.dispatch({
                type:'sendMessage',
                message: this.message
            });

            this.message = '';
        }
    },
    watch: {
        message(newValue, oldValue) {
            if (!((newValue === '' && oldValue === '') || (newValue !== '' && oldValue !== ''))) {
                if (newValue === '' && oldValue !== '') {
                    this.$store.dispatch({
                        type: 'stopWritting'
                    });
                } else if (newValue !== '' && oldValue === '') {
                    this.$store.dispatch({
                        type: 'startWritting'
                    });
                }
            }
        }
    }
}
</script>
