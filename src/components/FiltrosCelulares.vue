<template>
  <div class="q-pa-md" style="width: 400px">
    <q-list bordered separator>
      <q-item v-ripple>
        <q-item-section>
          <q-item-label>Filtros</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <!-- para las options esta todo en filtros por lo que solo hay que llamar al array indicado
         en firebase se puede ver su nombre -->
        <q-item-section>
          <q-select v-model="modelPrecio" :options="precios" label="Precio" />
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>
          <q-select v-model="modelMarca" :options="filtros.marcas" label="Marcas" />
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>
          <q-select v-model="modelPantalla" :options="precios" label="Tamaño de pantalla" />
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>
          <q-select v-model="modelSO" :options="filtros.sistemaOperativo" label="Sistema Operativo" />
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>
          <q-select v-model="modelColor" :options="marcas" label="Color" />
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>
          <q-select v-model="modelAlmacenamiento" :options="marcas" label="Almacenamiento Interno" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
  <p>{{  filtros }}</p>
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

onMounted(
  async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'filtros'));
      const filtrosArray = [];

      querySnapshot.forEach((doc) => {
        filtrosArray.push(doc.data());
      });

      filtros.value = filtrosArray[0]; // Asigna los datos a la variable reactiva
      /* Se indica la posición 0 ya que devuleve un array donde cada posicion es un documento (object{})
      y cada propiedad del object es un array (en este caso)*/
    } catch (error) {
      console.error('Error al obtener los filtros:', error);
    }
  }
)


</script>'
