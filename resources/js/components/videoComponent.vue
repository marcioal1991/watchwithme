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
export default {
    name: 'video-component',        
};
</script>