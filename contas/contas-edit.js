var ContasEdit = {
    props: [
        'conta'
    ],
    components: {
        'contas-form': ContasForm
    },
    template: `                              
            <contas-form :conta="conta"></contas-form> 
    `
}
