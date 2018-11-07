<template>
    <div>
        <div>
            <video-container></video-container>
        </div>
        <div>
            <video-controls></video-controls>
        </div>
        <div>
            <video-list></video-list>
        </div>
    </div>
</template>

<script>
import videoContainer from '@/components/video/videoContainer';
import videoControls from '@/components/video/videoControls';
import videoList from '@/components/video/videoList';

export default {
    name: 'video-component'
};
</script>