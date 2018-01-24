let bus = new Vue()

Vue.use(VueResource);
Vue.use(VueLocalStorage);

var app = new Vue({
    el: '#app',
    components: {
        'contas': Contas,
        'login': Login,
    },
    router: router


})

