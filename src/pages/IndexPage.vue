<template>
  <q-page class="q-pa-lg">
    <div class="row">
      <div class="col-12 col-md-3">
        <q-expansion-item class="lt-md" expand-separator icon="filter_alt" label="Filter by">
          <FiltrosCelulares />
        </q-expansion-item>
        <div class="gt-sm q-pa-lg">
          <p><q-icon name="filter_alt" class="q-pl-md q-pr-lg text-h5" />Filter by</p>
          <FiltrosCelulares />
        </div>
      </div>
      <div class="col-12 col-sm-9">
        <CardCelular :title="celulares.modelo" :price="celulares.precio" :imageUrl="celulares.imagenesURL.frontal" />
        <CardCelular title="Honor X5" price="80" imageUrl="https://citycellmx.com/wp-content/uploads/2024/03/HONOR-X5.png" />
        <CardCelular title="Samsung Galaxy A25" price="240" imageUrl="https://www.sagitariodigital.com.ar/wp-content/uploads/2024/01/A25-1.jpg" />
      </div>
    </div>
  </q-page>
</template>

<script setup>

import FiltrosCelulares from '../components/FiltrosCelulares.vue'
import CardCelular from '../components/CardCelular.vue'
import { onMounted, ref } from 'vue';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from 'src/boot/firebase';

defineOptions({
  name: 'IndexPage'
});

const celulares = ref([]); // Variable reactiva para almacenar los datos de los celulares

onMounted(//esta dentro de onMounted para que se ejecute cuando se monte el componente
  async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'celulares'));
      const celularesArray = querySnapshot.docs.map(doc => doc.data());

      celulares.value = celularesArray[1]; // Asigna los datos a la variable reactiva
      console.log('Celulares:', celulares.value);
      console.log('Celulares:', celulares.value.imagenesURL.frontal);
    } catch (error) {
      console.error('Error al obtener los celulares:', error);
    }
  }
)

</script>
