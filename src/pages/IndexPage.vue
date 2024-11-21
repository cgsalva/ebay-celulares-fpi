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
        <CardCelular
          v-for="(celular, index) in celulares"
          :key="index"
          :marca="celular.marca"
          :modelo="celular.modelo"
          :precio="celular.precio"
          :imageUrl="celular.imagenesURL.frontal"
          :id="celular.id"
        />
        <!-- Agregue para mandar el id y poder pasarlo a la página de detalle -->
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


// Función para obtener los celulares de la base de datos
const fetchCelulares = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'celulares'));
    if (!querySnapshot.empty) {
      celulares.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Celulares:', celulares.value);
    } else {
      console.warn('No se encontraron celulares en la base de datos.');
    }
  } catch (error) {
    console.error('Error al obtener los celulares:', error);
  }
};


// Llamada a la función al montar el componente
onMounted(fetchCelulares);
</script>
