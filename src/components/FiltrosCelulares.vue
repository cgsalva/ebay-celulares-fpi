<template>
  <q-list separator>
    <q-item clickable v-ripple>
      <!-- para las options esta todo en filtros por lo que solo hay que llamar al array indicado
       en firebase se puede ver su nombre -->
      <q-item-section>
        <q-select v-model="modelPrecio" :options="filtros.precios" label="Precio" borderless />
      </q-item-section>
    </q-item>
    <q-item clickable v-ripple>
      <q-item-section>
        <q-select v-model="modelMarca" :options="filtros.marcas" label="Marcas" borderless />
      </q-item-section>
    </q-item>
    <q-item clickable v-ripple>
      <q-item-section>
        <q-select v-model="modelPantalla" :options="filtros.pantalla" label="Tamaño de pantalla" borderless />
      </q-item-section>
    </q-item>
    <q-item clickable v-ripple>
      <q-item-section>
        <q-select v-model="modelSO" :options="filtros.sistemaOperativo" label="Sistema Operativo" borderless />
      </q-item-section>
    </q-item>
    <q-item clickable v-ripple>
      <q-item-section>
        <q-select v-model="modelColor" :options="filtros.colores" label="Color" borderless />
      </q-item-section>
    </q-item>
    <q-item clickable v-ripple>
      <q-item-section>
        <q-select v-model="modelAlmacenamiento" :options="filtros.almacenamiento" label="Almacenamiento Interno" borderless />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import { ref, onMounted } from 'vue' /* Importamos onMounted para poder  */
import { db } from 'src/boot/firebase'
import { collection, getDocs } from 'firebase/firestore/lite';

const filtros = ref([])

const modelPrecio = ref([''])

const modelMarca = ref([''])

const modelPantalla = ref([''])

const modelSO = ref([''])

const modelColor = ref([''])

const modelAlmacenamiento = ref([''])

const precios = ref(['$0.00 - $99.99', '$100 - $199.99', '$200 - Superior'])

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
