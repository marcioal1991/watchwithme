import store from '@/store';
import { userInfo } from 'os';
const socket = new window.io();

socket.on("connect", function (data) {   
    store.commit('enterInRoom', socket.id)    
});

socket.on("welcome-user", function(data) {
    store.commit('receiveLoggedUsers', data)
});

socket.on("receive-message", function (data) {
    store.commit('receiveMessage', data);
});

socket.on("receive-image", function (data) {
    store.commit('receiveImage', data);
});

socket.on("user-start-writting", function (data) {
    store.commit('userStartWritting', {
        id: data.id    
    });
});

socket.on("user-stop-writting", function (data) {
    store.commit('userStopWritting', {
        id: data.id        
    });
});

socket.on("user-set-name", function (data) {
    store.dispatch({
        type: 'setName',
        data: data
    });
});

socket.on("user-enter", function (data) {
    store.commit('userEnterRoom', data);
});

socket.on("user-leave", function (data) {
    store.commit('userLeaveRoom', data);
});

export default socket;