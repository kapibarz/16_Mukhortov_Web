const API_URL = "https://69c7ffd063393440b317571e.mockapi.io/gabe/mail/incoming_messages/gabe_mail";

const store = new Vuex.Store({
    modules: {
        messages: {
            namespaced: true,
            state: {
                messages: [],
                loading: false,
                error: null
            },
            mutations: {
                SET_MESSAGES: function(state, messages) {
                    state.messages = messages;
                },
                SET_LOADING: function(state, loading) {
                    state.loading = loading;
                },
                SET_ERROR: function(state, error) {
                    state.error = error;
                },
                ADD_MESSAGE: function(state, message) {
                    state.messages.unshift(message);
                },
                REMOVE_MESSAGE: function(state, id) {
                    state.messages = state.messages.filter(function(m) { return m.id !== id; });
                },
                UPDATE_MESSAGE: function(state, updatedMessage) {
                    var index = state.messages.findIndex(function(m) { return m.id === updatedMessage.id; });
                    if (index !== -1) {
                        state.messages[index] = updatedMessage;
                    }
                }
            },
            actions: {
                fetchMessages: function(_ref) {
                    var commit = _ref.commit;
                    commit('SET_LOADING', true);
                    commit('SET_ERROR', null);
                    return fetch(API_URL).then(function(response) {
                        if (!response.ok) throw new Error('Ошибка загрузки');
                        return response.json();
                    }).then(function(messages) {
                        commit('SET_MESSAGES', messages);
                        commit('SET_LOADING', false);
                    }).catch(function(error) {
                        commit('SET_ERROR', 'Не удалось загрузить сообщения');
                        commit('SET_LOADING', false);
                    });
                },
                addMessage: function(_ref2, _ref3) {
                    var commit = _ref2.commit;
                    var title = _ref3.title, body = _ref3.body;
                    return fetch(API_URL, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ title: title, body: body })
                    }).then(function(response) {
                        if (!response.ok) throw new Error('Ошибка отправки');
                        return response.json();
                    }).then(function(newMessage) {
                        commit('ADD_MESSAGE', newMessage);
                        return newMessage;
                    });
                },
                deleteMessage: function(_ref4, id) {
                    var commit = _ref4.commit;
                    return fetch(API_URL + "/" + id, {
                        method: "DELETE"
                    }).then(function(response) {
                        if (!response.ok) throw new Error('Ошибка удаления');
                        commit('REMOVE_MESSAGE', id);
                        return true;
                    });
                },
                updateMessage: function(_ref5, _ref6) {
                    var commit = _ref5.commit;
                    var id = _ref6.id, title = _ref6.title, body = _ref6.body;
                    return fetch(API_URL + "/" + id, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ title: title, body: body })
                    }).then(function(response) {
                        if (!response.ok) throw new Error('Ошибка обновления');
                        return response.json();
                    }).then(function(updatedMessage) {
                        commit('UPDATE_MESSAGE', updatedMessage);
                        return updatedMessage;
                    });
                }
            },
            getters: {
                allMessages: function(state) { return state.messages; },
                messagesCount: function(state) { return state.messages.length; }
            }
        },
        games: {
            namespaced: true,
            state: {
                games: [],
                loading: false,
                error: null
            },
            mutations: {
                SET_GAMES: function(state, games) {
                    state.games = games;
                },
                SET_LOADING: function(state, loading) {
                    state.loading = loading;
                },
                SET_ERROR: function(state, error) {
                    state.error = error;
                }
            },
            actions: {
                fetchSteamGames: function(_ref7) {
                    var commit = _ref7.commit, dispatch = _ref7.dispatch;
                    commit('SET_LOADING', true);
                    commit('SET_ERROR', null);
                    
                    var steamGamesList = [
                        { name: "Counter-Strike 2", appid: 730 },
                        { name: "Dota 2", appid: 570 },
                        { name: "PUBG", appid: 578080 },
                        { name: "Apex Legends", appid: 1172470 },
                        { name: "GTA V", appid: 271590 }
                    ];
                    
                    var results = [];
                    var promises = steamGamesList.map(function(game) {
                        var steamUrl = "https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=" + game.appid;
                        var proxyUrl = "https://api.allorigins.win/get?url=" + encodeURIComponent(steamUrl);
                        return fetch(proxyUrl).then(function(response) {
                            return response.json();
                        }).then(function(wrapper) {
                            var data = JSON.parse(wrapper.contents);
                            results.push({ name: game.name, ccu: data.response.player_count });
                        });
                    });
                    
                    return Promise.all(promises).then(function() {
                        results.sort(function(a, b) { return b.ccu - a.ccu; });
                        commit('SET_GAMES', results);
                        commit('SET_LOADING', false);
                    }).catch(function() {
                        return dispatch('fetchFallbackGames');
                    }).catch(function() {
                        commit('SET_LOADING', false);
                    });
                },
                fetchFallbackGames: function(_ref8) {
                    var commit = _ref8.commit;
                    return fetch("games.json").then(function(res) {
                        return res.json();
                    }).then(function(data) {
                        commit('SET_GAMES', data.games || []);
                        commit('SET_LOADING', false);
                    }).catch(function() {
                        commit('SET_ERROR', "Ошибка загрузки данных игр");
                        commit('SET_LOADING', false);
                    });
                }
            },
            getters: {
                allGames: function(state) { return state.games; }
            }
        },
        dog: {
            namespaced: true,
            state: {
                currentDogImage: null,
                loading: false,
                error: null
            },
            mutations: {
                SET_DOG_IMAGE: function(state, image) {
                    state.currentDogImage = image;
                },
                SET_LOADING: function(state, loading) {
                    state.loading = loading;
                },
                SET_ERROR: function(state, error) {
                    state.error = error;
                }
            },
            actions: {
                fetchRandomDog: function(_ref9) {
                    var commit = _ref9.commit;
                    commit('SET_LOADING', true);
                    commit('SET_ERROR', null);
                    return fetch("https://dog.ceo/api/breeds/image/random").then(function(response) {
                        return response.json();
                    }).then(function(data) {
                        commit('SET_DOG_IMAGE', data.message);
                        commit('SET_LOADING', false);
                    }).catch(function() {
                        commit('SET_ERROR', "Ошибка загрузки собаки");
                        commit('SET_LOADING', false);
                    });
                }
            },
            getters: {
                currentDog: function(state) { return state.currentDogImage; }
            }
        }
    }
});

Vue.component('steam-games', {
    computed: {
        loading: function() { return this.$store.state.games.loading; },
        error: function() { return this.$store.state.games.error; },
        games: function() { return this.$store.getters['games/allGames']; }
    },
    mounted: function() {
        this.$store.dispatch('games/fetchSteamGames');
    },
    template: `
        <div>
            <h2>Топ игр Steam</h2>
            <div v-if="loading">Загрузка...</div>
            <div v-if="error">{{ error }}</div>
            <table border="1" v-if="!loading && !error && games.length">
                <thead>
                    <tr><th>#</th><th>Игра</th><th>Онлайн</th></tr>
                </thead>
                <tbody>
                    <tr v-for="(game, index) in games" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ game.name }}</td>
                        <td>{{ game.ccu.toLocaleString('ru-RU') }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
});

Vue.component('random-dog', {
    computed: {
        loading: function() { return this.$store.state.dog.loading; },
        error: function() { return this.$store.state.dog.error; },
        dogImage: function() { return this.$store.getters['dog/currentDog']; }
    },
    mounted: function() {
        this.$store.dispatch('dog/fetchRandomDog');
    },
    methods: {
        loadRandomDog: function() {
            this.$store.dispatch('dog/fetchRandomDog');
        }
    },
    template: `
        <div>
            <h2>Собака Гейба</h2>
            <div v-if="loading">Загрузка...</div>
            <div v-if="error">{{ error }}</div>
            <div v-if="!loading && !error && dogImage">
                <img :src="dogImage" style="max-width:100%">
                <br>
                <button @click="loadRandomDog">Ещё собаку</button>
            </div>
        </div>
    `
});

Vue.component('add-message', {
    data: function() {
        return {
            title: '',
            body: '',
            loading: false,
            error: null,
            result: null
        };
    },
    methods: {
        addGame: function() {
            var _this = this;
            if (!this.title || !this.body) {
                this.error = "Заполните все поля";
                return;
            }
            this.loading = true;
            this.error = null;
            this.$store.dispatch('messages/addMessage', { title: this.title, body: this.body })
                .then(function(data) {
                    _this.result = data;
                    _this.title = '';
                    _this.body = '';
                    _this.loading = false;
                })
                .catch(function() {
                    _this.error = "Не удалось отправить";
                    _this.loading = false;
                });
        }
    },
    template: `
        <div>
            <h2>Написать Гейбу</h2>
            <div v-if="error" style="color: red">{{ error }}</div>
            <div v-if="result">
                <h3>Письмо отправлено!</h3>
                <p>ID: {{ result.id }}</p>
                <button @click="result = null">Написать ещё</button>
            </div>
            <div v-else>
                <p>Тема: <input v-model="title" style="width:100%"></p>
                <p>Текст: <textarea v-model="body" style="width:100%" rows="5"></textarea></p>
                <button @click="addGame" :disabled="loading">{{ loading ? 'Отправка...' : 'Отправить' }}</button>
            </div>
        </div>
    `
});

Vue.component('messages', {
    computed: {
        loading: function() { return this.$store.state.messages.loading; },
        error: function() { return this.$store.state.messages.error; },
        messages: function() { return this.$store.getters['messages/allMessages']; },
        messagesCount: function() { return this.$store.getters['messages/messagesCount']; }
    },
    mounted: function() {
        this.$store.dispatch('messages/fetchMessages');
    },
    methods: {
        deleteMessage: function(id) {
            var _this2 = this;
            if (confirm("Удалить письмо #" + id + "?")) {
                this.$store.dispatch('messages/deleteMessage', id).then(function() {
                    _this2.$store.dispatch('messages/fetchMessages');
                });
            }
        }
    },
    template: `
        <div>
            <h2>Все письма</h2>
            <div v-if="loading">Загрузка...</div>
            <div v-if="error">{{ error }}</div>
            <div v-if="!loading && messages.length === 0">Писем нет</div>
            <div v-for="msg in messages" :key="msg.id" style="border:1px solid #ccc; margin:10px 0; padding:10px">
                <strong>ID:</strong> {{ msg.id }}<br>
                <strong>Тема:</strong> {{ msg.title }}<br>
                <strong>Текст:</strong> {{ msg.body }}<br>
                <strong>Дата:</strong> {{ msg.createdAt ? new Date(msg.createdAt).toLocaleString('ru-RU') : 'Нет даты' }}<br>
                <button @click="deleteMessage(msg.id)">Удалить</button>
            </div>
        </div>
    `
});

Vue.component('update-message', {
    data: function() {
        return {
            id: '',
            title: '',
            body: '',
            loading: false,
            error: null,
            result: null
        };
    },
    methods: {
        updateGame: function() {
            var _this3 = this;
            if (!this.id || !this.title || !this.body) {
                this.error = "Заполните все поля";
                return;
            }
            this.loading = true;
            this.error = null;
            this.$store.dispatch('messages/updateMessage', { id: this.id, title: this.title, body: this.body })
                .then(function(data) {
                    _this3.result = data;
                    _this3.id = '';
                    _this3.title = '';
                    _this3.body = '';
                    _this3.loading = false;
                })
                .catch(function() {
                    _this3.error = "Не удалось изменить";
                    _this3.loading = false;
                });
        }
    },
    template: `
        <div>
            <h2>Редактирование</h2>
            <div v-if="error" style="color: red">{{ error }}</div>
            <div v-if="result">
                <h3>Изменено!</h3>
                <p>ID: {{ result.id }}</p>
                <button @click="result = null">Редактировать ещё</button>
            </div>
            <div v-else>
                <p>ID: <input v-model="id"></p>
                <p>Тема: <input v-model="title"></p>
                <p>Текст: <textarea v-model="body" rows="5"></textarea></p>
                <button @click="updateGame" :disabled="loading">{{ loading ? 'Изменение...' : 'Изменить' }}</button>
            </div>
        </div>
    `
});

Vue.component('delete-message', {
    data: function() {
        return {
            id: '',
            loading: false,
            deleted: false,
            error: null
        };
    },
    methods: {
        deleteGame: function() {
            var _this4 = this;
            if (!this.id) {
                this.error = "Введите ID";
                return;
            }
            if (!confirm("Удалить письмо #" + this.id + "?")) return;
            this.loading = true;
            this.error = null;
            this.$store.dispatch('messages/deleteMessage', this.id)
                .then(function() {
                    _this4.deleted = true;
                    _this4.id = '';
                    _this4.loading = false;
                })
                .catch(function() {
                    _this4.error = "Не удалось удалить";
                    _this4.loading = false;
                });
        }
    },
    template: `
        <div>
            <h2>Удаление</h2>
            <div v-if="error" style="color: red">{{ error }}</div>
            <div v-if="deleted">
                <h3>Удалено!</h3>
                <p>Письмо успешно удалено</p>
                <button @click="deleted = false">Удалить ещё</button>
            </div>
            <div v-else>
                <p>ID: <input v-model="id"></p>
                <button @click="deleteGame" :disabled="loading">{{ loading ? 'Удаление...' : 'Удалить' }}</button>
            </div>
        </div>
    `
});

new Vue({
    el: '#app',
    store: store,
    data: {
        currentPage: 'steam-games',
        ads: [
            { text: "СКИНЫ CS2 ЗА КОПЕЙКИ", url: "https://lis-skins.com/" },
            { text: "КАЗИНО ДЛЯ ГЕЙМЕРОВ", url: "https://plg.bet/bets" },
            { text: "КРУТИ И ВЫИГРЫВАЙ", url: "http://csgetto.gold/" },
            { text: "ДОТА 2 БУСТ", url: "https://funpay.com/lots/82/" },
            { text: "ИГРЫ ДЕШЕВЛЕ", url: "https://ggsel.net/" },
            { text: "ИМБА САЙТ", url: "https://ru14.bongacams.com/" },
            { text: "АККАУНТЫ ДЁШЕВО", url: "https://ggsel.net/catalog/steam-accounts" },
            { text: "КЛЮЧИ ОПТОМ", url: "https://ggsel.net/catalog/steam-keys" },
            { text: "ФУРРИ ДРУГ НА ЧАС", url: "https://playerok.com/products/661534349874-furri-drug-i-otchim-na-chas" },
            { text: "СКИНЫ CS2 ЗА КОПЕЙКИ", url: "https://lis-skins.com/" },
            { text: "КАЗИНО ДЛЯ ГЕЙМЕРОВ", url: "https://plg.bet/bets" },
            { text: "КРУТИ И ВЫИГРЫВАЙ", url: "http://csgetto.gold/" },
            { text: "ДОТА 2 БУСТ", url: "https://funpay.com/lots/82/" },
            { text: "ИГРЫ ДЕШЕВЛЕ", url: "https://ggsel.net/" },
            { text: "ИМБА САЙТ", url: "https://ru14.bongacams.com/" },
            { text: "АККАУНТЫ ДЁШЕВО", url: "https://ggsel.net/catalog/steam-accounts" },
            { text: "КЛЮЧИ ОПТОМ", url: "https://ggsel.net/catalog/steam-keys" },
            { text: "ФУРРИ ДРУГ НА ЧАС", url: "https://playerok.com/products/661534349874-furri-drug-i-otchim-na-chas" },
            { text: "СКИНЫ CS2 ЗА КОПЕЙКИ", url: "https://lis-skins.com/" },
            { text: "КАЗИНО ДЛЯ ГЕЙМЕРОВ", url: "https://plg.bet/bets" },
            { text: "КРУТИ И ВЫИГРЫВАЙ", url: "http://csgetto.gold/" },
            { text: "ДОТА 2 БУСТ", url: "https://funpay.com/lots/82/" },
            { text: "ИГРЫ ДЕШЕВЛЕ", url: "https://ggsel.net/" },
            { text: "ИМБА САЙТ", url: "https://ru14.bongacams.com/" },
            { text: "АККАУНТЫ ДЁШЕВО", url: "https://ggsel.net/catalog/steam-accounts" },
            { text: "КЛЮЧИ ОПТОМ", url: "https://ggsel.net/catalog/steam-keys" },
            { text: "ФУРРИ ДРУГ НА ЧАС", url: "https://playerok.com/products/661534349874-furri-drug-i-otchim-na-chas" },
            { text: "СКИНЫ CS2 ЗА КОПЕЙКИ", url: "https://lis-skins.com/" },
            { text: "КАЗИНО ДЛЯ ГЕЙМЕРОВ", url: "https://plg.bet/bets" },
            { text: "КРУТИ И ВЫИГРЫВАЙ", url: "http://csgetto.gold/" },
            { text: "ДОТА 2 БУСТ", url: "https://funpay.com/lots/82/" },
            { text: "ИГРЫ ДЕШЕВЛЕ", url: "https://ggsel.net/" },
            { text: "ИМБА САЙТ", url: "https://ru14.bongacams.com/" },
            { text: "АККАУНТЫ ДЁШЕВО", url: "https://ggsel.net/catalog/steam-accounts" },
            { text: "КЛЮЧИ ОПТОМ", url: "https://ggsel.net/catalog/steam-keys" },
            { text: "ФУРРИ ДРУГ НА ЧАС", url: "https://playerok.com/products/661534349874-furri-drug-i-otchim-na-chas" }
        ]
    },
    computed: {
        currentComponent: function() {
            var components = {
                'steam-games': 'steam-games',
                'random-dog': 'random-dog',
                'add-message': 'add-message',
                'messages': 'messages',
                'update-message': 'update-message',
                'delete-message': 'delete-message'
            };
            return components[this.currentPage];
        }
    },
    methods: {
        openAd: function(url) {
            window.open(url, '_blank');
        }
    }
});