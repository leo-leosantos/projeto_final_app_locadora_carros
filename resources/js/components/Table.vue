<template>
<div>
  <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col" v-for="t , key in titulos" :key="key"  >{{ t.titulo }}</th>
                <th v-if="visualizar.visivel || atualizar.visivel || remover.visivel">Ações</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="obj, chave in dadosFiltrados" :key="chave">
                <td v-for="valor, chaveValor in obj" :key="chaveValor">
                    <span v-if="titulos[chaveValor].tipo == 'texto'">{{ valor }}</span>
                    <span v-if="titulos[chaveValor].tipo == 'data'">{{ '...' + valor }}</span>
                    <span v-if="titulos[chaveValor].tipo == 'imagem'">
                        <img :src="'./storage/'+valor" width="50" height="50">
                    </span>
                </td>
                 <td v-if="visualizar.visivel || atualizar.visivel || remover.visivel">
                    <button v-if="visualizar.visivel" class="btn btn-outline-primary btn-sm" :data-toggle="visualizar.dataToggle" :data-target="visualizar.dataTarget" @click="setStore(obj)">Visualizar</button>
                    <button v-if="atualizar.visivel" class="btn btn-outline-warning btn-sm" :data-toggle="atualizar.dataToggle" :data-target="atualizar.dataTarget" @click="setStore(obj)">Atualizar</button>
                    <button v-if="remover.visivel" class="btn btn-outline-danger btn-sm" :data-toggle="remover.dataToggle" :data-target="remover.dataTarget" @click="setStore(obj)">Remover</button>

                </td>
            </tr>
            <!-- <tr v-for="obj  in dados" :key="obj.id">
                <template v-for="(valor, chave) in obj">
                    <td v-if="titulos.includes(chave)"  :key="chave">
                        <span v-if="chave == 'imagem'">
                            <img :src="'./storage/'+ valor" width="50" height="50">
                        </span>
                        <span v-else>
                                {{ valor }}
                        </span>
                    </td>
                 </template>
            </tr> -->
        </tbody>

        <!-- //corigir o erro do v-if junto com 0 v-for -->
          <!-- <tbody>
            <tr v-for="obj  in dados" :key="obj.id">
                <template v-for="(valor, chave) in obj">
                    <td v-if="titulos.includes(chave)"  :key="chave">
                        <span v-if="chave == 'imagem'">
                            <img :src="'./storage/'+ valor" width="50" height="50">
                        </span>
                        <span v-else>
                                {{ valor }}
                        </span>
                    </td>
                 </template>
            </tr>
        </tbody> -->
    </table>
  </div>
</template>

<script>

export default {
    props: ['dados','titulos','atualizar','visualizar','remover'],
    methods:{
            setStore(obj){
                console.log(obj)
              // this.$store.state.item = obj
             //  console.log(this.$store.state.item = obj)
            }
    },
    computed: {
        dadosFiltrados() {
            let campos = Object.keys(this.titulos)
            let dadosFiltrados = []

            //console.log(campos);

            this.dados.map((item, chave) => {
               // console.log(chave, item)

                let itemFiltrado = {}
                campos.forEach(campo => {
                    itemFiltrado[campo] = item[campo]
                   // console.log(itemFiltrado)
                    //console.log(chave,item, campo)
                })

                dadosFiltrados.push(itemFiltrado)
            })
            return dadosFiltrados
        }
    }
};
  // this.$store.state.transacao.status = ''
               // this.$store.state.transacao.mensagem = ''
</script>
