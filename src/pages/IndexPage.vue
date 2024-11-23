<template>
  <q-page class="q-pa-lg">
    <div class="row">
      <div class="col-12 col-md-3">
        <q-expansion-item class="lt-md" expand-separator icon="filter_alt" label="Filter by">
          <FiltrosCelulares @filtros="conseguirFiltros" @limpiar="limpiar"/>
        </q-expansion-item>
        <div class="gt-sm q-pa-lg">
          <p><q-icon name="filter_alt" class="q-pl-md q-pr-lg text-h5" />Filter by</p>
          <FiltrosCelulares @filtros="conseguirFiltros" @limpiar="limpiar"/>
        </div>
      </div>

      <div class="col-12 col-sm-9">
        <CardCelular
          v-for="(celular, index) in celularesFiltrados"
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
const Filtros = ref({}); // Declaración de la variable reactiva
const celularesFiltrados = ref([]); // Celulares filtrados
const mostrar = ref(true);

const conseguirFiltros = (emitirFiltros) => {
  // Asignar los filtros a la variable reactiva
  Filtros.value = emitirFiltros;
  filtrarCelulares()
};

const limpiar = (value) => {
  Filtros.value = value;
  filtrarCelulares();

};

const filtrarCelulares = () => {
  // Si no hay filtros, mostramos todos los celulares
  if (Object.keys(Filtros.value).length === 0) {
    celularesFiltrados.value = celulares.value;
    console.log('Celulares filtrados:', JSON.stringify(celularesFiltrados.value));
    return;
  }

  celularesFiltrados.value = celulares.value.filter(celular => {
    return Object.keys(Filtros.value).every(key => {
      if (!Filtros.value[key]) return true; // Si el filtro está vacío, no lo aplicamos

      // Manejo especial para el filtro de precio
      if (key === 'precio') {
        return celular.precio <= Filtros.value[key]; // Comparación para precio igual o menor
      }

      // Filtros generales para otros atributos
      return celular[key] === Filtros.value[key];
    });
  });

  console.log('Celulares filtrados:', JSON.stringify(celularesFiltrados.value));
};

// Función para obtener los celulares de la base de datos
const fetchCelulares = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'celulares'));
    if (!querySnapshot.empty) {
      celulares.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } else {
      console.warn('No se encontraron celulares en la base de datos.');
    }
  } catch (error) {
    console.error('Error al obtener los celulares:', error);
  }
  celularesFiltrados.value = celulares.value;
};


// Llamada a la función al montar el componente
onMounted(fetchCelulares);
</script>
