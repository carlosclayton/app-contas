var ContasList = {
    data() {
        return {
            search: '',
            contas: {
                type: Object
            },
            meta: {
                type:Object
            },
            form: {
                id: '',
                name: '',
                value: '',
                done: ''
            },
            tipoConta: 'Criar'
        }
    },
    created() {
        this.listarContas(1)
    },
    mounted(){
        bus.$on('change-page', this.listarContas)
    },
    computed: {
        countStatus() {
            var count = 0
            for (var i in this.contas.data) {
                if (this.contas.data[i].done == 0) {
                    count++
                }
            }
            return count
        },
        status() {
            if (this.contas.data == 0)
                return "Nenhuma conta cadastrada"
            else if (this.countStatus > 0)
                return "Existem " + this.countStatus + " conta(s) serem paga(s)"
            else
                return 'Nenhuma conta a pagar'
        },
    },
    methods: {
        submit(){
            var resource = this.$resource('bills', {}, {
                create: {method: 'POST', url: 'http://localhost:8000/api/bills'},
                update: {method: 'PUT', url: 'http://localhost:8000/api/bills{/bill}'}

            });
            if(this.tipoConta == 'Criar'){
                resource.create({
                    name: this.form.name,
                    value: this.form.value,
                    done: this.form.done,
                }).then((response) => {
                    $('#myModal').modal('hide')
                    this.listarContas(1)
                    console.log(this.contas)
                }, error => {
                    console.log(error)
                });
            }else{
                resource.update({bill: this.form.id}, {
                    name: this.form.name,
                    value: this.form.value,
                    done: this.form.done,
                }).then((response) => {
                    $('#myModal').modal('hide')
                    this.listarContas(1)
                    console.log(this.contas)
                }, error => {
                    console.log(error)
                });
            }
        },
        criarConta(){
            this.tipoConta = 'Criar'
            this.form.name = ''
            this.form.value = ''
            this.form.done = ''
            $('#myModal').modal('show')
        },
        editarConta(conta){
            this.tipoConta = 'Editar'
            this.form.id = conta.id
            this.form.name = conta.name
            this.form.value = conta.value
            this.form.done = conta.done
            $('#myModal').modal('show')
        },
        listarContas(page){
            var resource = this.$resource('bills{?page}', {}, {
                bills: {method: 'GET', url: 'http://localhost:8000/api/bills{?page}'}
            });
            resource.bills({page: page}).then((response) => {
                this.contas = response.data.data
                this.meta = response.data.data.meta
                console.log(this.contas)
            }, error => {
                console.log(error)
            });
        },
        baixarConta(conta){
            if (confirm("Deseja realizar esta operação? ")) {
                var resource = this.$resource('bills{/bill}', {}, {
                    update: {method: 'PUT', url: 'http://localhost:8000/api/bills{/bill}'}
                });
                status = (conta.done == 1) ? 0 : 1
                resource.update({bill: conta.id}, {done: status} ).then((response) => {
                    console.log(response)
                    this.listarContas(1)
                }, error => {
                    console.log(error)
                });
            }
        },
        removeConta(index){
            if (confirm("Deseja deletar este item? ")) {
                var resource = this.$resource('bills{/bill}', {}, {
                    delete: {method: 'DELETE', url: 'http://localhost:8000/api/bills{/bill}'}
                });
                resource.delete({bill: index}).then((response) => {
                    this.listarContas(1)
                }, error => {
                    console.log(error)
                });
            }
        },
        searchConta(){
            var resource = this.$resource('bills', {}, {
                search: {method: 'GET', url: 'http://localhost:8000/api/bills{?search}'}
            });
            resource.search({search: this.search}).then((response) => {
                console.log(response)
                this.contas = response.data.data
                this.meta = response.data.data.meta
            }, error => {
                console.log(error)
            });
        }
    },
    watch: {
        'search': function (val) {
            console.log(val)
            this.search = val
            this.searchConta()

        }
    },

    filters: {
        payment(value) {
            return (value == 1) ? 'Pago' : 'Aguardando'
        }
    },
    components: {
        'pagination': Pagination
    },
    template: `
    <div class="container">        
    
        <div class="row">
            <button type="button" class="btn btn-primary " data-toggle="modal" v-on:click.prevent="criarConta" data-toggle="modal">
              <span class="glyphicon glyphicon-plus" aria-hidden="true" data-toggle="modal"></span> Criar conta
            </button>
        <br />  
        <br />  
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Search for..." v-model="search">
          <span class="input-group-btn">
            <button class="btn btn-default" type="button" v-on:click.prevent="searchConta"> <span class="glyphicon glyphicon-search" aria-hidden="true" ></span> Pesquisar</button>
          </span>
        </div>

            <!-- Modal -->
            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                <form v-on:submit.prevent="submit">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h2 class="modal-title" id="myModalLabel"><span class="glyphicon glyphicon-th-large" aria-hidden="true"></span> {{ tipoConta }} conta</h2>
                  </div>
                  <div class="modal-body">                  
                      
                        <div class="form-group">
                            <label>Nome</label>
                            <input type="text" class="form-control" v-model="form.name">
                        </div>
    
                        <div class="form-group">
                            <label>Valor</label>
                            <input type="text" class="form-control" v-model="form.value">
                        </div>
        
                        <div class="form-group">
                            <label>Pago</label>
                            <select v-model="form.done" class="form-control">
                                <option disabled value="">Selecione uma opção</option>
                                <option value="1">Pago</option>
                                <option value="0">Não pago</option>
                            </select>
                        </div>                                       
                  </div>
                  <div class="modal-footer">
                    <button type="submit" class="btn btn-primary" ><span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span> {{ tipoConta }} conta</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal"><span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span> Cancelar</button>                    
                  </div>
                  </form>  
                </div>
              </div>
            </div>
            
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
                    <tr v-for="conta, index in contas.data">
                        <th scope="row" width="1%">{{ conta.id }}</th>
                        <td>{{ conta.name }}</td>
                        <td width="10%">{{ conta.value | currency('R$', 2) }}</td>
                        <td width="10%">{{ conta.created_at }}</td>
                        <td width="10%" > <span :class="{'label label-success': conta.pago, 'label label-default': !conta.pago, }">{{ conta.done | payment }} </span> </td>
                        <td width="15%">
                            <button class="btn btn-primary" v-on:click="baixarConta(conta)"><span class="glyphicon glyphicon-save" aria-hidden="true"></span></button>                            
                            <button class="btn btn-success" v-on:click="editarConta(conta)"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></button> 
                            <button class="btn btn-danger" v-on:click="removeConta(conta.id)"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></td>
                    </tr>
                    </tbody>
                </table>                
                <pagination :pagination="meta.pagination"></pagination>
            </div>
        </div>
    </div>    
`
}
