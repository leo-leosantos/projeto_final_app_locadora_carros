<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <!--inicio do card de busca-->
        <card-component titulo="Busca de Marcas">
          <template v-slot:conteudo>
            <div class="form-row">
              <div class="col mb-3">
                <input-container-component
                  titulo="Id"
                  id="inputId"
                  id-help="idHelp"
                  texto-ajuda="Opcional. Informe o dia da Marca"
                >
                  <input
                    type="number"
                    class="form-control"
                    id="inputId"
                    aria-describedby="idHelp"
                    placeholder="Informe o Id o Registro"
                    min="1"
                    v-model="busca.id"
                  />
                </input-container-component>
              </div>

              <div class="col mb-3">
                <input-container-component
                  titulo="Nome da Marca"
                  id="inputNome"
                  id-help="nomeHelp"
                  texto-ajuda="Opcional. Informe o dia da Marca"
                >
                  <input
                    type="text"
                    class="form-control"
                    id="inputId"
                    aria-describedby="nomeHelp"
                    placeholder="Informe o nome da Marca da Marcas do carro"
                    v-model="busca.nome"
                  />
                </input-container-component>
              </div>
            </div>
          </template>
          <template v-slot:rodape>
            <button
              type="submit"
              class="btn btn-outline-primary btn-sm float-right"
              @click="pesquisar()"
            >
              Pesquisar
            </button>
          </template>
        </card-component>

        <!--Fim do card de busca-->

        <!--Inicio do card de listagem de marcas-->

        <card-component titulo="Relação de Marcas">
          <template v-slot:conteudo>
            <table-component
                :dados="marcas.data"
                :visualizar="true"
                :atualizar="true"
                :remover="true"
                :titulos="{
                    id:{titulo: 'ID', tipo: 'texto'},
                    nome:{titulo: 'Nome', tipo: 'texto'},
                    imagem:{titulo: 'Imagem', tipo: 'imagem'},
                    created_at:{titulo: 'Data de Criação', tipo: 'data'}
                }"
            >
            </table-component>
          </template>
          <template v-slot:rodape>
            <div class="row">
                <div class="col-10">
                    <paginate-component>
                            <li v-for="l, key in marcas.links" :key="key" :class="l.active ? 'page-item active'  : 'page-item'" @click="paginacao(l)">
                                <a class="page-link"  v-html="l.label"></a>
                            </li>
                    </paginate-component>
                </div>
                <div class="col">
                    <button type="submit" class="btn btn-outline-success btn-sm float-right"  data-toggle="modal" data-target="#modalMarca">
                        Adicionar
                    </button>
                </div>
              </div>
          </template>
        </card-component>
        <!--Fim do card de listagem de marcas-->
      </div>
    </div>
    <modal-component id="modalMarca" titulo="Adicionar Marca">
        <template v-slot:alertas >
            <alert-component tipo="success" :detalhes="transaoDetalhes" titulo="Marca cadastrada com sucesso"  v-if="transacaoStatus == 'adicionado'"> </alert-component>
            <alert-component tipo="danger"  :detalhes="transaoDetalhes" titulo="Error ao tentar cadastrar a marca" v-if="transacaoStatus == 'error'"> </alert-component>

        </template>
        <template v-slot:conteudo>
            <div class="form-grup">
                <input-container-component
                        titulo="Nome da Marca"
                        id="novoNome"
                        id-help="novoNomeHelp"
                        texto-ajuda="Opcional. Informe o nome da marca"
                        >
                        <input
                            type="text"
                            class="form-control"
                            id="inputId"
                            aria-describedby="novoNomeHelp"
                            placeholder="Informe o nome da Marca da Marcas do carro" v-model="nomeMarca"
                        />
                </input-container-component>
            </div>
            <div class="form-grup">
                <input-container-component
                        titulo="Imagem"
                        id="novoImagem"
                        id-help="novoImagemHelp"
                        texto-ajuda="Opcional. selecione uma imagem no formado png"
                        >
                        <input
                            type="file"
                            class="form-control-file"
                            id="inputId"
                            aria-describedby="novoImagem"
                            placeholder="selecione uma imagem" @change="carregarImagem($event)"
                        />
                </input-container-component>
            </div>
        </template>
        <template v-slot:rodape>
             <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
            <button type="button" class="btn btn-primary" @click="salvar()">Salvar</button>
        </template>>
    </modal-component>


  </div>
</template>

<script>
import Paginate from './Paginate.vue'
export default {
    components: {Paginate},
    data() {
        return {
            urlBase: 'http://localhost/pf_app_locadora_carros/public/api/v1/marca',
            urlPaginacao: '',
            urlFiltro: '',
            nomeMarca: '',
            arquivoImagem: [],
            transacaoStatus: '',
            transaoDetalhes: {},
            marcas: {data: []},
            busca: {
                    id: '' ,
                    nome: ''
                }
        }
    },
    computed:{
        token(){
            let token = document.cookie.split(';').find(indice => {

                return indice.includes('token=')
                // console.log(indice, indice.includes('token='))
            })

            token = token.split('=')[1]
            token = 'Bearer ' + token;
            return token;
        }
    },
    methods: {
        pesquisar(){
            //console.log(this.busca)
            let filtro = ''

            for (let chave in this.busca){
                    if(this.busca[chave]){
                    //console.log(chave, this.busca[chave])
                    if(filtro != ''){
                        filtro +=";"
                    }
                        filtro += chave + ':like:' + this.busca[chave]
                }
            }
            if(filtro != ''){
                this.urlPaginacao = 'page=1'
                this.urlFiltro = '&filtro=' + filtro
            }else{
                this.urlFiltro  = ''
            }
            this.carregarLista()
        },

        paginacao(l){
            if(l.url){
               // this.urlBase = l.url
               this.urlPaginacao = l.url.split('?')[1]
                this.carregarLista()
            }
        },
         carregarLista(){
            let url = this.urlBase + '?' + this.urlPaginacao + this.urlFiltro
            console.log(url)
             let config = {
                headers: {
                    'Accept':       'application/json',
                    'Authorization': this.token,
                }
            }
            axios.get(url,config ).then(response =>{
                this.marcas = response.data
               /// console.log(this.marcas.data)

            }).catch(errors => {
                console.error(errors)
            })
         },
        carregarImagem(e){
            this.arquivoImagem = e.target.files
        },
        salvar(){
           // console.log(this.nomeMarca, this.arquivoImagem[0])

            let formData = new FormData();
            formData.append('nome', this.nomeMarca);
            formData.append('imagem', this.arquivoImagem[0]);

            let config ={
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept':       'application/json',
                    'Authorization': this.token,
                }
            }

            axios.post(this.urlBase, formData , config)
            .then(response => {
                this.transacaoStatus = 'adicionado'
                this.transaoDetalhes = {
                    mensagem: 'Id do Registro: ' +  response.data.id
                }

                console.log(response)
            }).catch(errors => {
                this.transacaoStatus = 'error'
                this.transaoDetalhes =  {
                    mensagem: errors.response.data.message,
                    dados: errors.response.data.errors
                }
                //console.log(errors.response.data.message)
            })
        }
    },
    mounted(){
        this.carregarLista();
    }
}
</script>
