var ContasList = {
    data() {
        return {
            title: "Testando Vue.js",
            contas: [],
            formArea: true,
            formStatus: 'new',
            form: {
                nome: '',
                valor: '',
                data: '',
                pago: ''
            }
        }
    },
    components: {
        'contas-form': ContasForm
    },
    mounted() {
        this.contas = [
            {data: '20/08/2016', nome: 'Conta de luz', valor: 1800.90, pago: false},
            {data: '22/08/2016', nome: 'Conta de gas', valor: 700.90, pago: true},
            {data: '24/08/2016', nome: 'Conta de água', valor: 830.90, pago: false}
        ],
            bus.$on('form-area', (val) => {
                this.formArea = val
            })

    },
    computed: {
        countStatus() {
            var count = 0
            for (var i in this.contas) {
                if (!this.contas[i].pago) {
                    count++
                }
            }
            return count
        },
        status() {
            if (this.contas == 0)
                return "Nenhuma conta cadastrada"
            else if (this.countStatus > 0)
                return "Existem " + this.countStatus + " conta(s) serem paga(s)"
            else
                return 'Nenhuma conta a pagar'
        },
    },
    methods: {
        criarConta(){
            console.log("Criar conta")
            bus.$on('push-form', (val) => {
                this.contas.push(val)
            }),
                this.formArea = false
        },
        editarConta(conta){
            console.log(conta)
            this.form = conta
            this.formArea = false
            this.formStatus = 'edit'
        },
        baixarConta(conta){
            console.log(conta)
            conta.pago = (conta.pago == 1) ? 0 : 1
            this.form = conta
        },
        removeConta(index){
            if (confirm("Deseja deletar este item? ")) {
                this.$delete(this.contas, index);
            }
        }
    },
    watch: {
        'form.nome': function (val) {
            console.log(val)
        }
    },

    filters: {
        payment(value) {
            return (value == 1) ? 'Pago' : 'Aguardando'
        }
    },
    template: `
    <div class="container">        
        <div class="row">              
            <router-link :to="{ name: 'new'}" class="btn btn-primary"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Criar conta</router-link>
        </div>
        <div class="row">
            <h1 class="page-header">Contas</h1>           
                <div :class="{ 'alert alert-success': countStatus == 0, 'alert alert-danger': countStatus > 0, 'alert alert-warning': contas.length == 0 } " role="alert">{{ status }}</div>
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Valor</th>
                        <th>Data</th>
                        <th>Paga</th>
                        <th>Opções</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="conta, index in contas">
                        <th scope="row" width="1%">{{ index + 1 }}</th>
                        <td>{{ conta.nome }}</td>
                        <td width="10%">{{ conta.valor | currency('R$', 2) }}</td>
                        <td width="10%">{{ conta.data }}</td>
                        <td width="10%" > <span :class="{'label label-success': conta.pago, 'label label-default': !conta.pago, }">{{ conta.pago | payment }} </span> </td>
                        <td width="15%">
                            <button class="btn btn-primary" v-on:click="baixarConta(conta)"><span class="glyphicon glyphicon-save" aria-hidden="true"></span></button>                            
                            <router-link :to="{ name: 'edit', params: {conta}}" class="btn btn-success"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></router-link>
                            <button class="btn btn-danger" v-on:click="removeConta(index)"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>    
`
}
