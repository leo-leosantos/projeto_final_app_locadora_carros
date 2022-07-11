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
            <table-component></table-component>
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
                {{ nomeMarca }}
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
                {{ arquivoImagem }}
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
            arquivoImagem: []
        }
    },
    methods: {
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
                    'Accept':       'application/json'
                }
            }

            axios.post(this.urlBase, formData , config)
            .then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })
        }
    }
}
</script>
