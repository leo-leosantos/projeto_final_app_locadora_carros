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
              class="btn btn-outline-success btn-sm float-right"
            >
              Adiconar
            </button>
          </template>
        </card-component>
        <!--Fim do card de listagem de marcas-->
      </div>
    </div>
  </div>
</template>

<script>
</script>
