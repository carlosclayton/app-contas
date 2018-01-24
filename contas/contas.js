var Contas = {
    components: {
        'menu-principal': MenuPrincipal,
        'new': ContasNew,
        'list': ContasList
    },
    template: `                        
            <div>
            <menu-principal></menu-principal>            
            <div class="container">                                        
                <div class="row">                                                         
                    <router-view></router-view>
                </div>
            </div>
            </div>
    `
}
