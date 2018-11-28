import Vuex from 'vuex';
import Vue from 'vue';
import socket from '@/websocket';

Vue.use(Vuex);

function User (id) {
    this.colors = {};
    this.name = '';
    this.id = id;

    this.getId = function() {
        return this.id;
    };
    
    this.setColors = function (clrs) {
        this.colors = clrs || {};
    };

    this.setName = function (n) {
        if (n === null || n === undefined) {
            n = "";
        }
        this.name = String(n);
    };
    
    this.getName = function () {        
        return this.name;
    };

    this.getBgColor = function () {     
        return this.colors.bgColor;
    }

    this.getTxtColor = function () {
        return this.colors.txtColor;
    }
}


function Message (user, message, image, video) {
    this.user = user;
    this.message = message || null;
    this.image = image || null;
    this.video = video || null;

    this.getUser = function () {
        return this.user;
    };

    this.getMessage = function () {
        return this.message;
    };

    this.getImage = function () {
        return this.image;
    };

    this.getVideo = function () {

    };
}

let colors = [
    {
        bgColor: "#000",
        txtColor: "#fff",
    },
    {
        bgColor: "rgb(159, 26, 26)",
        txtColor: "#fff",
    },
    {
        bgColor: "rgb(48, 26, 159)",
        txtColor: "#fff",
    },    
    {
        bgColor: "rgb(159, 26, 153)",
        txtColor: "#fff",
    }    
];

const store = new Vuex.Store({
    state: {
        users: [],
        messages: [],
        name: '',
        user: null,
        usersWritting: []
    },
    mutations: {
        enterInRoom(state, userId) {
            state.user = new User(userId);
            state.user.setColors(colors.pop() || {});
            state.users.push(state.user);
        },
        receiveLoggedUsers(state, dataArray) {
            dataArray.forEach((dataUser) => {
                const user = new User(dataUser.id);
                user.setName(dataUser.name);
                user.setColors(colors.pop() || {});
                state.users.push(user);
            })
        },
        setName(state, name) {
            state.name = name;
            state.user.name = name;
            socket.emit('user-set-name', name);
        },
        userSetName(state, data) {
            state.users = state.users.map((user) => {
                if (user.id === data.data.id) {
                    user.name = data.data.name;
                }
                return user;
            });
        },
        userEnterRoom(state, data) {
            state.users.push(new User(data.id));
            const o = new Audio();
            o.src = 'http://assets.jetimob.com/sons/new_chat_out.mp3';
            o.play();
        },
        userLeaveRoom(state, data) {
            state.users = state.users.filter((user) => {
                return user.id !== data.id;
            });
            state.usersWritting.filter((user) => {
                return user.id !== data.id;
            });            
        },
        userStopWritting(state, data) {
            state.usersWritting = state.usersWritting.filter((user) => {
                return user.id !== data.id;
            });            
        },
        userStartWritting(state, data) {
            const users = state.users.filter((user) => {
                return user.id === data.id;
            });

            if (users.length > 0) {
                const user = users.pop();
    
                if (state.usersWritting.indexOf(user) === -1) {
                    state.usersWritting.push(user);
                }
            }
        },
        receiveMessage(state, data) {
            const users = state.users.filter((user) => {
                return user.id === data.id;
            });
            
            if (users.length > 0) {
                const user = users.pop();
                const message = new Message(user, data.message);
                state.messages.push(message);
                const o = new Audio();
                o.src = 'http://assets.jetimob.com/sons/new_chat_out.mp3';
                o.play()
            }
        },
        receiveImage(state, data) {
            const users = state.users.filter((user) => {
                return user.id === data.id;
            }); 

            if (users.length > 0) {
                const user = users.pop();
                const message = new Message(user, null, data.image);
                state.messages.push(message);
                const o = new Audio();
                o.src = 'http://assets.jetimob.com/sons/new_chat_out.mp3';
                o.play();
            }
        },
        receiveVideo(state, data) {
            const users = state.users.filter((user) => {
                return user.id === data.id;
            });
            
            const blob = new Blob([new Uint8Array(data.video)]);
            
            if (users.length > 0) {
                const user = users.pop();
                const message = new Message(user, null, null, window.URL.createObjectURL(blob));
                state.messages.push(message);
                const o = new Audio();
                o.src = 'http://assets.jetimob.com/sons/new_chat_out.mp3';
                o.play();
            }
        },
        addMessage(state, message) {
            state.messages.push(message);
        },
        addImage(state, message) {
            state.messages.push(message);
        },
        addVideo(state, message) {
            state.messages.push(message);
        }
    },
    actions: {
        sendMessage(context, data) {
            const message = new Message(context.state.user, data.message);
            socket.emit('send-message', message.getMessage());
            context.commit('addMessage', message);  
        },
        sendVideo(context, data) {
            const message = new Message(context.state.user, null, null, window.URL.createObjectURL(data.video));            
            socket.emit('send-video', data.video);
            context.commit('addVideo', message);
        },
        addImage(context, data) {
            const message = new Message(context.state.user, null, {
                url: data.original,
                type: data.filetype,
                name: data.filename
            });

            socket.emit('send-image', {
                url: data.image,
                type: data.filetype,
                name: data.filename
            });
            context.commit('addImage', message);
        },
        startWritting(context) {
            socket.emit('user-start-writting');
        },
        stopWritting(context) {
            socket.emit('user-stop-writting');
        },
        setName(context, data) {            
            context.commit('userSetName', data);
        }
    }
});

export default store;