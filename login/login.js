var Login = {
    data() {
        return {
            errors: [],
            name: '',
            form: {
                login: '',
                password: '',
                error: false
            }
        }
    },
    methods: {
        submit(){
            console.log(this.form)
            this.accessToken()
        },
        accessToken(){
            var resource = this.$resource('access_token', {}, {
                token: {method: 'POST', url: 'http://localhost:8000/api/access_token'}
            });

            resource.token({
                email: this.form.login,
                password: this.form.password
            }).then((response) => {
                console.log(response.data.token)
                this.$localStorage.set('token', response.data.token)
                this.$router.push('/contas/list')
            }, error => {
                console.log(error)
                this.form.error = true
            });
        }
    },
    template: `                    
            <div class="container">                    
                <div class="row">                
                          <div class="alert alert-danger alert-dismissible fade in" role="alert" v-show="form.error"> 
                          <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button> 
                          <strong>Erro!</strong> Dados incorretos, tente novamente. 
                          </div>
                          <h1 class="page-header" id="forms">Área do cliente</h1>
                    <form v-on:submit.prevent="submit">
                            <div class="form-group"  >
                                <label class="control-label">E-mail</label>
                                <input class="form-control" id="login" v-model="form.login" >                                                                
                            </div>

                          <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" v-model="form.password"> 
                          </div>
                          <button type="submit" class="btn btn-primary">Entrar</button>
                    </form>
                </div>
            </div>
    `
}
