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
        <!-- Renderizar la lista de celulares -->
        <CardCelular v-for="(celular, index) in celulares" :key="index" :title="celular.modelo" :price="celular.precio"
          :imageUrl="celular.imagenesURL.frontal" />
        <!-- Celulares de ejemplo adicionales -->
        <CardCelular title="Honor X5" price="80"
          imageUrl="https://citycellmx.com/wp-content/uploads/2024/03/HONOR-X5.png" />
        <CardCelular title="Samsung Galaxy A25" price="240"
          imageUrl="https://www.sagitariodigital.com.ar/wp-content/uploads/2024/01/A25-1.jpg" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from 'src/boot/firebase'; // Asegúrate de que la ruta sea correcta
import FiltrosCelulares from '../components/FiltrosCelulares.vue';
import CardCelular from '../components/CardCelular.vue';

const celulares = ref([]); // Declaración de la variable reactiva

const fetchCelulares = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'celulares'));
    if (!querySnapshot.empty) {
      celulares.value = querySnapshot.docs.map(doc => doc.data());
    } else {
      console.warn('No se encontraron celulares en la base de datos.');
    }
    console.log('Celulares obtenidos:', celulares.value);
  } catch (error) {
    console.error('Error al obtener los celulares:', error);
  }
};

// Llamada a la función al montar el componente
onMounted(fetchCelulares);
</script>
