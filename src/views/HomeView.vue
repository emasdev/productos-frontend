<template>
  <div class="row mt-4">
    <div class="">
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>SKU</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Imagen</th>
              <th></th>
            </tr>
          </thead>
          <tbody class="table-group-divider" id="productos-table">
            <tr v-if="this.loading">
              <td colspan="7">
                <h3>Cargando...</h3>
              </td>
            </tr>
            <tr v-else v-for="producto, i in this.productos" :key="producto.id">
              <td v-text="producto.nombre"></td>
              <td v-text="producto.descripcion"></td>
              <td v-text="producto.sku"></td>
              <td v-text="producto.precio"></td>
              <td v-text="producto.cantidad"></td>
              <td>
                <img v-if="producto.imagen" class="img-thumbnail" style="width: 150px" :src="producto.imagen">
              </td>
              <td>
                <div class="d-flex">
                  <router-link :to="{ path: 'edit/' + producto.id }" class="m-2">
                    editar
                  </router-link>
                  <button @click="() => deleteProduct(producto.id, producto.nombre)" class="m-2">
                    eliminar
                  </button>
                </div>

              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

// export default {
//   name: 'HomeView',
//   components: {
//     HelloWorld
//   }
// }

import axios from 'axios';
import { deleteProduct } from "../functions"

export default {
  data() {
    return {
      productos: null,
      loading: false,
    }
  },
  mounted() {
    this.getProductos()
  },
  methods: {
    getProductos() {
      this.loading = true
      axios.get("http://127.0.0.1:8000/api/v1/productos").then(
        res => {
          this.productos = res.data
          this.loading = false
        })
    },
    deleteProduct(id, nombre) {
      // what()
      deleteProduct('http://127.0.0.1:8000/api/v1/productos', id, "Eliminar producto", "¿Eliminar producto " + nombre + "?")
      this.cargando = false
    }
  }
}
</script>
