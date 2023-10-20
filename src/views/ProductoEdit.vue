<template>
  <div class="row mt-3">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-header text-center">
          Editar producto
        </div>
        <div class="card-body  text-start">
          <form @submit.prevent="update">
            <div class="d-grid col-6 mx-auto mb-3">
              <img v-if="this.imagen" class="img-thumbnail" height="100" :src="this.imagen" id="imagen-add">
            </div>

            <div class="form-group mb-3">
              <label>Nombre</label>
              <input v-model="nombre" type="text" class="form-control" id="producto-nombre" required>

            </div>
            <div class="form-group mb-3">
              <label>Descripción</label>
              <input v-model="descripcion" type="text" class="form-control" id="producto-descripcion" required>
            </div>
            <div class="form-group mb-3">
              <label>Precio</label>
              <input v-model="precio" type="number" class="form-control" id="producto-precio" required>
            </div>
            <div class="form-group mb-3">
              <label>Cantidad</label>
              <input v-model="cantidad" type="number" class="form-control" id="producto-cantidad" required>
            </div>
            <div class="form-group mb-3">
              <label>Imagen (URL)</label>
              <div>
                <small class="form-text text-muted">
                  Ejemplo:
                  https://via.placeholder.com/640x480.png/{{ this.color }}?text=products+{{
                    this.nombre.replace(/\s/g, '')
                  }}
                </small>
              </div>

              <input v-model="imagen" type="text" class="form-control" id="producto-imagen" required>
            </div>
            <div class="d-grid col-6 mx-auto mb-3">
              <button class="btn btn-success">Editar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios"
import { useRoute } from "vue-router"
import { showAlert, sendRequest } from "../functions"

export default {
  data() {
    return {
      id: null,
      nombre: "",
      descripcion: "",
      precio: "",
      cantidad: "",
      imagen: "",
      sku: "",
      url: "http://127.0.0.1:8000/api/v1/productos",
      color: Math.floor(Math.random() * 16777215).toString(16),
      loading: false
    }
  },
  mounted() {
    const route = useRoute()
    this.id = route.params.id
    this.url = this.url + "/" + this.id
    this.getProducto()
  },
  methods: {
    getProducto() {
      axios.get(this.url).then(res => {
        this.nombre = res.data.data.nombre
        this.descripcion = res.data.data.descripcion
        this.precio = res.data.data.precio
        this.cantidad = res.data.data.cantidad
        this.imagen = res.data.data.imagen
        this.sku = res.data.data.sku
      })
    },
    update() {
      this.loading = true

      if (this.nombre === "") {
        showAlert("Ingresa un nombre", "warning", "producto-nombre")
      } else if (this.descripcion === "") {
        showAlert("Ingresa una descripcion", "warning", "producto-descripcion")
      } else if (this.precio === "") {
        showAlert("Ingresa una precio", "warning", "producto-precio")
      } else if (this.cantidad === "") {
        showAlert("Ingresa una cantidad", "warning", "producto-cantidad")
      } else if (this.imagen === "") {
        showAlert("Ingresa una imagen", "warning", "producto-imagen")
      } else {
        // const sku = 'pro-' + Math.floor(Math.random() * 9) + Math.floor(Math.random() * 9) + Math.floor(Math.random() * 9) + this.nombre.slice(-3)
        const params = {
          nombre: this.nombre,
          descripcion: this.descripcion,
          precio: this.precio,
          cantidad: this.cantidad,
          imagen: this.imagen,
          sku: this.sku

        }

        axios({
          method: "PUT",
          url: this.url,
          params: params,
        }).then(res => {
          const status = res.status
          if (status == 200) {
            showAlert("Producto actualizado", "success")
            window.setTimeout(() => {
              window.location.href = "/"
            }, 1000)
          } else {
            showAlert("Error en el servicio", "error")
          }
        }).catch((e) => {
          console.log(e)
          debugger
        })
      }
    }
  }
}
</script>
