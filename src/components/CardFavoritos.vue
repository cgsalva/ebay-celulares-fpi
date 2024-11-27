<template>
  <div class="q-pa-lg row q-gutter-md text-center" style="display: inline-block">
    <q-card class="q-pa-md text-left" flat bordered style="min-width: 320px; ">
      <q-card-section horizontal>
        <q-img
          class="col-5"
          style="height: 200px;"
          :src="props.imageUrl"
        />
        <div class="q-pl-md">
          <div class="text-subtitle1 text-grey-8">{{ marca }}</div>
          <div class="text-h5 text-blue-10 q-mb-lg">{{ modelo }}</div>
          <div class="text-subtitle2 text-weight-regular text-grey-8 q-mt-lg">Desde</div>
          <div class="text-h5 text-blue-10 q-mb-sm">${{ precio }}</div>
          <div class="text-subtitle2 text-weight-regular text-grey-8">Incluye IVA</div>
        </div>
      </q-card-section>
      <q-card-actions>
        <q-btn rounded color="blue-6" :to="link(id)" label="Ver más" class="q-mx-lg" style="width: 100px;" />
        <q-btn @click="$emit('delete')" rounded icon="delete"/>
      </q-card-actions>
    </q-card>

  </div>


</template>

<script setup>

const props = defineProps({
  imageUrl: String,
  marca: String,
  modelo: String,
  precio: Number,
  id: String
})
// Función para generar la ruta de detalle de un celular y mandar el id
const link = id => `detalle/${id}`
</script>
