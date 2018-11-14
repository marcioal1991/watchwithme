import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

function User (name, colors) {
    this.setName = function (n) {
        name = n;
    };
    this.colors = colors;
    this.getName = function () {
        return name;
    };

    this.getBgColor = function () {
        return colors.bgColor;
    }

    this.getTxtColor = function () {
        return colors.txtColor;
    }
}


function Message (user, message) {
    
    this.getUser = function () {
        return user;
    }

    this.getMessage = function () {
        return message;
    }
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

const outro = new User('bot', colors.pop());

const store = new Vuex.Store({
    state: {
        users: [],
        messages: [],
        name: '',
        sdp: '',
        user: null,
        usersWritting: [],
        synced: false
    },
    mutations: {
        setName(state, name) {
            state.name = name;
        },
        setMeLikeUser(state) {
            if (state.user === null) {
                state.user = new User(state.name, colors.pop());                
                state.users.push(state.user);
            }
            state.usersWritting.push(state.user);
            state.users.push(outro);
            
            // setInterval(() => {
            //     if (state.usersWritting.length === 0) {
            //         state.usersWritting.push(state.user);
            //         state.usersWritting.push(state.user);
            //     } else {
            //         state.usersWritting.pop();
            //     }
            // }, 5000);

        },
        userEnterRoom(state, name) {
            state.users.push(new User(name));
        },
        userLeaveRoom(state, name) {
            const users = state.users.filter((user) => {
                return user.getName() === name;
            });

            if (users.length > 0) {
                const user = users.pop();
                const pos = state.usersWritting.indexOf(user);

                if (pos !== -1) {
                    state.users.splice(pos, 1);
                }
            }
        },
        stopWritting(state, name) {
            const users = state.users.filter((user) => {
                return user.getName() === name;
            });

            if (users.length > 0) {
                const user = users.pop();
                const pos = state.usersWritting.indexOf(user);

                if (pos !== -1) {
                    state.usersWritting.splice(pos, 1);
                }
            }
            
        },
        startWritting(state, name) {
            const users = state.users.filter((user) => {
                return user.getName() === name;
            });

            if (users.length > 0) {
                const user = users.pop();
    
                if (state.usersWritting.indexOf(user) === -1) {
                    state.usersWritting.push(user);
                }
            }
        },
        receiveMessage(state, dataMessage) {
            const users = state.users.filter((user) => {
                return user.getName() === dataMessage.name;
            });
            
            if (users.length > 0) {
                const user = users.pop();
                const message = new Message(user, dataMessage.msg);
                state.messages.push(message);
            }   
        },
        addMessage(state, message) {
            state.messages.push(message);
        }
    },
    actions: {
        sendMessage(context, data) {
            console.log(data)
            const message = new Message(context.state.user, data.message);
            context.commit('addMessage', message);
        }
    }
});

export default store;