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
                  />
                </input-container-component>
              </div>
            </div>
          </template>
          <template v-slot:rodape>
            <button
              type="submit"
              class="btn btn-outline-primary btn-sm float-right"
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
                :dados="marcas"
                :titulos="['ID', 'Nome', 'Imagem', 'Criado em']"
            >
            </table-component>
          </template>
          <template v-slot:rodape>
            <button
              type="submit"
              class="btn btn-outline-success btn-sm float-right"  data-toggle="modal" data-target="#modalMarca"
            >
              Adicionar
            </button>
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
export default {
    data() {
        return {
            urlBase: 'http://localhost/pf_app_locadora_carros/public/api/v1/marca',
            nomeMarca: '',
            arquivoImagem: [],
            transacaoStatus: '',
            transaoDetalhes: {},
            marcas: []
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

         carregarLista(){
             let config = {
                headers: {
                    'Accept':       'application/json',
                    'Authorization': this.token,
                }
            }
            axios.get(this.urlBase,config ).then(response =>{
                this.marcas = response.data
                console.log(this.marcas)

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
