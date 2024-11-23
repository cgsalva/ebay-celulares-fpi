<template>
  <q-list separator>
    <q-item clickable v-ripple>
      <!-- para las options esta todo en filtros por lo que solo hay que llamar al array indicado
       en firebase se puede ver su nombre -->
      <q-item-section>
        <!-- <q-select v-model="modelPrecio" :options="filtros.precios" label="Precio" borderless /> -->
        <!-- <q-select v-model="modelPrecio" label="Precio" borderless /> -->
        <label for="precio">
          Precio: $ {{ modelPrecio }}
        </label>
        <q-slider id="precio" v-model="modelPrecio" :min="0" :max="1500" />
      </q-item-section>
    </q-item>
    <q-item clickable v-ripple>
      <q-item-section>
        <q-select v-model="modelMarca" :options="filtros.marcas" label="Marcas" borderless />
      </q-item-section>
    </q-item>
    <q-item clickable v-ripple>
      <q-item-section>
        <q-select v-model="modelPantalla" :options="filtros.pantalla" label="Pantalla" borderless />
      </q-item-section>
    </q-item>
    <!-- <q-item clickable v-ripple>
      <q-item-section>
        <q-select v-model="modelSO" :options="filtros.sistemaOperativo" label="Sistema Operativo" borderless />
      </q-item-section>
    </q-item> -->
    <!-- <q-item clickable v-ripple>
      <q-item-section>
        <q-select v-model="modelColor" :options="filtros.colores" label="Color" borderless />
      </q-item-section>
    </q-item> -->
    <q-item clickable v-ripple>
      <q-item-section>
        <q-select v-model="modelAlmacenamiento" :options="filtros.almacenamiento" label="Almacenamiento Interno"
          borderless />
      </q-item-section>
    </q-item>
    <q-item clickable v-ripple>
      <q-item-section>
        <q-select v-model="modelRam" :options="filtros.ram" label="Memoria RAM" />
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section @click="limpiarFiltros">
        <q-btn @click="$emit('limpiar', {})" label="Limpiar" color="primary" />
      </q-item-section>
      <q-item-section>
        <q-btn @click="$emit('filtros', {
          precio: modelPrecio,
          marca: modelMarca,
          pantalla: modelPantalla,
          almacenamiento: modelAlmacenamiento,
          ram: modelRam
        })" label="Aplicar" color="primary" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import { ref, onMounted } from 'vue' /* Importamos onMounted para poder  */
import { db } from 'src/boot/firebase'
import { collection, getDocs } from 'firebase/firestore/lite';

const filtros = ref([])
const modelPrecio = ref(0)
const modelMarca = ref('')
const modelPantalla = ref('')
const modelAlmacenamiento = ref('')
const modelRam = ref('')

const limpiarFiltros = () => {
  modelPrecio.value = 0
  modelMarca.value = ''
  modelPantalla.value = ''
  modelAlmacenamiento.value = ''
}

onMounted(//esta dentro de onMounted para que se ejecute cuando se monte el componente
  async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'filtros'));
      const filtrosArray = querySnapshot.docs.map(doc => doc.data());

      filtros.value = filtrosArray[0]; // Asigna los datos a la variable reactiva
      /* Se indica la posición 0 ya que devuleve un array donde cada posicion es un documento (object{})
      y cada propiedad del object es un array (en este caso)*/
    } catch (error) {
      console.error('Error al obtener los filtros:', error);
    }
  }
)


</script>'
