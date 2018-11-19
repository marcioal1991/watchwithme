<template>
    <div>
        <div>
            <video ref="video" :src="$store.state.stream" autoplay></video>
        </div>
        <!-- <div>
            <video-controls></video-controls>
        </div>
        <div>
            <video-list></video-list>
        </div> -->
    </div>
</template>

<script>
import videoContainer from '@/components/video/videoContainer';
// import videoControls from '@/components/video/videoControls';
// import videoList from '@/components/video/videoList';

export default {
    name: 'video-component',    
    mounted() {        
	    
    },
    updated() {
        // console.log(this.$store.state.stream)
    }
};
</script>