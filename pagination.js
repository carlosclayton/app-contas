var Pagination = {
    props: {
        'pagination': Object
    },
    methods: {
        changePage(page){
            if(page < 1 || page > this.pagination.total_pages){
                return
            }
            bus.$emit('change-page', page)
        }
    },
    template: `                        
        <div align="center">        
        <hr />
        <nav aria-label="Page navigation">
          <ul class="pagination">
            <li v-bind:class="{ 'disabled': !pagination.links.previous}">
              <a href="#" aria-label="Previous" v-on:click.prevent="changePage(pagination.current_page - 1)">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li v-for="page in parseInt(pagination.total_pages)" clas="page-item" 
            v-bind:class="{ 'active': pagination.current_page === page}">
                <a href="" v-on:click.prevent="changePage(page)">{{ page }}</a>
            </li>
            <li v-bind:class="{ 'disabled': !pagination.links.next}">
              <a href="" aria-label="Next" v-on:click.prevent="changePage(pagination.current_page + 1)">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
        </div>
    `
}
