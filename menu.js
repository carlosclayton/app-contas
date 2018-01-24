var MenuPrincipal = {
    data() {
        return {
            user: {
                type: Object
            }
        }
    },
    created() {
        Vue.http.headers.common['Authorization'] = 'Bearer ' + this.$localStorage.get('token')
        this.logado

    },
    methods: {
        logout(){
            var resource = this.$resource('logout', {}, {
                token: {method: 'POST', url: 'http://localhost:8000/api/logout'}
            });
            resource.token().then((response) => {
                this.$localStorage.remove('token')
                this.$router.push('/login')
            }, error => {
                console.log(error)
            });
        }
    },
    computed: {
        logado(){
            var resource = this.$resource('user', {}, {
                user: {method: 'POST', url: 'http://localhost:8000/api/user'}
            });
            resource.user().then((response) => {
                this.user = response.data.user
            }, error => {
                console.log(error)
            });
        }
    },
    template: `    
    <nav class="navbar navbar-default">
        <div class="container-fluid">    
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="#">Projeto Vue.js</a>
            </div>
            
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul class="nav navbar-nav">
                <li class="active"><router-link :to="{ name: '/contas/list'}">Contas</router-link></li>
              </ul>
              <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> <span class="glyphicon glyphicon-user" aria-hidden="true"></span> {{ user.name}} <span class="caret"></span></a>
                  <ul class="dropdown-menu">
                    <li><a href="" v-on:click.prevent="logout" ><span class="glyphicon glyphicon-off" aria-hidden="true"></span> Sair</a></li>
                  </ul>
                </li>
              </ul>      
            </div>           
        </div>
      </nav>
    `
}
