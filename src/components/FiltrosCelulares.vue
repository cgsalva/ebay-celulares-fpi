<template>
  <div class="q-pa-md" style="width: 400px">
    <q-list bordered separator>
    	<q-item v-ripple>
        <q-item-section>
          <q-item-label>Filtros</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
      	<q-item-section>
        	<q-select v-model="modelPrecio" :options="precios" label="Precio" />
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>
        	<q-select v-model="modelMarca" :options="marcas" label="Marcas" />
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
      	<q-item-section>
        	<q-select v-model="model" :options="precios" label="Tamaño de pantalla" />
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>
        	<q-select v-model="model" :options="marcas" label="Sistema Operativo" />
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>
        	<q-select v-model="model" :options="marcas" label="Color" />
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>
        	<q-select v-model="model" :options="marcas" label="Almacenamiento Interno" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const modelPrecio = ref([''])

const modelMarca = ref([''])

const precios = ref(['$0.00 - $99.99', '$100 - $199.99', '$200 - Superior'])

const marcas = ref(['Samsung', 'Nokia', 'LG'])

</script>'