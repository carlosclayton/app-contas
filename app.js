let bus = new Vue()

var app = new Vue({
    el: '#app',
    components: {
        'menu-principal': MenuPrincipal,
        'contas': Contas
    },
    router: router
})

