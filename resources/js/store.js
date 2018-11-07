import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

function User (name, colors) {
    this.setName = function (n) {
        name = n;
    };

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
        return message
    }
}
let colors = [
    {
        bgColor: "#000",
        txtColor: "#fff",
    },
]
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
                state.user = new User(state.name);
                state.users.push(state.user);
            }
        },
        enterRoom(state, name) {
            state.users.push(new User(name));
        },
        leaveRoom(state, name) {
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
        receiveMessage(state, name, message) {
            const users = state.users.filter((user) => {
                return user.getName() === name;
            });
            
            if (users.length > 0) {
                const user = users.pop();
                const message = new Message(user, message);
                state.messages.push(message);
            }
            
        }
    }
})

export default store;