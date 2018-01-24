let router = new VueRouter({
    routes: [
        {path: '/contas', component: Contas, name: 'contas',
            children: [
                {path: 'new', name: 'new', component: ContasNew},
                {path: 'edit/:conta', name: 'edit', component: ContasEdit, props: true},
                {path: 'list', name: 'list', component: ContasList}
            ]
        },
        {path: '/login', component: Login, name: 'login'}
    ]
})
