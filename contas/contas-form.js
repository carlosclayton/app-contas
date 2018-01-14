var ContasForm = {
    props: [
        'conta', 'tipo'
    ],
    methods: {
        submit(){
            if (this.tipo == 'novo') {
                //this.$parent.contas.push(this.form)
                bus.$emit('push-form', this.conta)
            }
            //this.$parent.formArea = true
            //bus.$emit('form-area', true)
            this.$router.push('/contas/list')

        },
        cancelar(){
            //this.$parent.formArea = true
            //bus.$emit('form-area', true)
            this.$router.push('/contas/list')
        }
    },
    template: `                                                      
                  <form v-on:submit.prevent="submit">
                  <h1 class="page-header">Conta</h1>
                    <div class="form-group">
                        <label>Nome</label>
                        <input type="text" class="form-control" v-model="conta.nome">
                    </div>

                    <div class="form-group">
                        <label>Valor</label>
                        <input type="text" class="form-control" v-model="conta.valor">
                    </div>

                    <div class="form-group">
                        <label>Data</label>
                        <input type="text" class="form-control" v-model="conta.data">
                    </div>

                    <div class="form-group">
                        <label>Pago</label>
                        <select v-model="conta.pago" class="form-control">
                            <option disabled value="">Selecione uma opção</option>
                            <option value="1">Pago</option>
                            <option value="0">Não pago</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Salvar</button>
                    <button class="btn btn-danger" v-on:click="cancelar"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Cancelar</button></td>
                </form>      
    `
}
