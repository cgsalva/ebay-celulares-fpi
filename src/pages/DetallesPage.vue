<template>
  <q-page>
    <div class="col-12">
      <div class="row">
        <div class="col-7">
          <q-img
            class="q-ma-sm"
            name="img2"
            size="600px"
            src="https://cdn.quasar.dev/img/parallax2.jpg"
          />
        </div>
        <div class="col-5">
          <q-card class="my-card q-ma-sm" flat bordered style="width: auto">
            <q-card-section>
              <div class="col-12 text-h5 q-mb-xs">
                Nombres del Producto:(inserte union a db*)
              </div>
            </q-card-section>
            <q-card-section>
              <div class="col-12 text-subtitle1 q-mb-xs">
                Precio:(inserte union a db*)
              </div>
            </q-card-section>
            <q-card-section>
              <div class="col-12 text-body1 q-mb-xs">
                Descripción:(inserte union a db*)
              </div>
            </q-card-section>
            <q-card-section>
              <div class="col-12 text-body1 q-mb-xs">
                <q-btn
                  outline
                  rounded
                  color="primary"
                  label="añadir al carro"
                  style="width: 100%"
                />
              </div>
            </q-card-section>
            <q-card-section>
              <div class="col-12 text-body1 q-mb-xs">
                <q-btn
                  outline
                  rounded
                  color="primary"
                  label="añadir a la lista de favoritos"
                  style="width: 100%"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="text-h5 q-ml-lg">Articulos similares</div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <CardCelular />
          <CardCelular />
          <CardCelular />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="text-h5 q-ml-lg">los clientes tambien compraron</div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <CardCelular />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import CardCelular from "../components/CardCelular.vue";
defineOptions({
  name: "DetallesPage",
});
</script>
