var Contas = {
    components: {
        'new': ContasNew,
        'list': ContasList
    },
    template: `
            <div class="container">        
                <div class="row">          
                    <router-view></router-view>
                </div>
            </div>
    `
}
