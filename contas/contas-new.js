var ContasNew = {
    data() {
        return {
            tipo: 'novo',
            conta: {
                nome: '',
                valor: 0,
                data: '',
                pago: false
            }
        }
    },
    components: {
       'contas-form': ContasForm
    },
    template: `                                    
                  <contas-form :conta="conta" :tipo="tipo" ></contas-form>       

    `
}
