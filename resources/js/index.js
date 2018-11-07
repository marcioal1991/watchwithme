
import Vue from 'vue';
import App from '@/components/App';
// import websocket from "./websocket";
// import { localRTC, dataChannel, remoteRTC } from './webrtc';
import store from '@/store';

new Vue({
    el: "#app",
    template: '<App/>', 
    store,
    components: { 
        App 
    }
});
