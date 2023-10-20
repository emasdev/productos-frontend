<template>
  <div class="row mt-4">
    <div class="accordion" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
            aria-expanded="true" aria-controls="collapseOne">
            Filtrar por nombre
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <form @submit.prevent="">
              <div class="mb-3">
                <div class="d-flex justify-content-center">
                  <div class="form-group">
                    <input type="email" class="form-control" id="search-nombre" aria-describedby="emailHelp">
                  </div>
                  <button type="submit" class="btn btn-primary">Buscar</button>
                </div>


              </div>

            </form>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo"
            aria-expanded="false" aria-controls="collapseTwo">
            Filtrar por sku
          </button>
        </h2>
        <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin
            adds the appropriate classes that we use to style each element. These classes control the overall appearance,
            as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or
            overriding our default variables. It's also worth noting that just about any HTML can go within the
            <code>.accordion-body</code>, though the transition does limit overflow.
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            Filtrar por rango
          </button>
        </h2>
        <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin
            adds the appropriate classes that we use to style each element. These classes control the overall appearance,
            as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or
            overriding our default variables. It's also worth noting that just about any HTML can go within the
            <code>.accordion-body</code>, though the transition does limit overflow.
          </div>
        </div>
      </div>
    </div>
  </div>
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
                  <router-link :to="'editProducto/' + producto.id" class="m-2">
                    <img height="30" src="https://cdn3.iconfinder.com/data/icons/feather-5/24/edit-512.png">
                  </router-link>
                  <button @click="() => deleteProduct(producto.id, producto.nombre)" class="m-2 border-0 bg-transparent">
                    <img height="30" src="https://cdn3.iconfinder.com/data/icons/feather-5/24/trash-2-512.png">
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
