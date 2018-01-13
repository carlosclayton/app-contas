var app = new Vue({
    el: '#app',
    data: {
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
    },
    mounted() {
        this.contas = [
            {data: '20/08/2016', nome: 'Conta de luz', valor: 1800.90, pago: false},
            {data: '22/08/2016', nome: 'Conta de gas', valor: 700.90, pago: false},
            {data: '24/08/2016', nome: 'Conta de água', valor: 830.90, pago: false}
        ]
    },
    computed: {
        countStatus() {
            var count = 0
            for(var i in this.contas){
                if(!this.contas[i].pago){
                    count++
                }
            }
            return count
        },
        status() {
            if(this.contas == 0)
                return "Nenhuma conta cadastrada"
            else if(this.countStatus > 0)
                return "Existem "+ this.countStatus + " conta(s) serem paga(s)"
            else
                return 'Nenhuma conta a pagar'
        },



    },
    methods: {
        criarConta(){
            console.log("Criar conta")
            this.formArea = false
        },
        submit(){
           console.log(this.form)
            if(this.formStatus == 'new'){
                this.contas.push(this.form)
            }

            this.formArea = true
        },
        editarConta(conta){
            console.log(conta)
            this.form = conta
            this.formArea = false
            this.formStatus = 'edit'
        },
        baixarConta(conta){
            console.log(conta)
            conta.pago = (conta.pago == 1)? 0 : 1
            this.form = conta
        },
        removeConta(index){
            if(confirm("Deseja deletar este item? ")){
                this.$delete(this.contas, index);
            }
        },
        cancelar(){
            this.formArea = true
        }

    },
    watch: {
        'form.nome': function (val) {
            console.log(val)
        }
    },

    filters: {
        payment(value) {
            return (value == 1)? 'Pago' : 'Aguardando'
        }
    }
})
