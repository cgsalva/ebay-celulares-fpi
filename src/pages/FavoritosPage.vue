<template>
  <q-page class="q-pa-lg">
    <div class="row">
      <div class="col-12">
        <div class="text-h5 text-center q-ml-lg text-weight-regular">Lista de favoritos</div>
      </div>
      <div class="col-12 q-mx-xl">
        <CardFavoritos  v-for="(celular, index) in celularesFavoritos" :key="index" :marca="celular.marca" @delete="eliminarFavorito(celular.id)"
          :modelo="celular.modelo" :precio="celular.precio" :imageUrl="celular.imagenesURL.frontal" :id="celular.id" />
        <!-- Agregue para mandar el id y poder pasarlo a la página de detalle -->
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import { db } from 'src/boot/firebase'; // Asegúrate de que la ruta sea correcta
import CardFavoritos from 'src/components/CardFavoritos.vue';

const user = ref([]); // Declaración de la variable reactiva
const celularesFavoritos = ref([]); // Declaración de la variable reactivo
const favoritos = ref([]); // Declaración de la variable reactivo

// Función para obtener los celulares de la base de datos
const eliminarFavorito = async (id) => {
  try {
    const userRef = doc(db, 'user', user.value.email);
    await updateDoc(userRef, {
      favoritos: favoritos.value.filter(favorito => favorito !== id)
    });
    fetchFavoritos();
  } catch (error) {
    console.error('Error al eliminar el favorito:', error);
  }
};

const fetchCelularesFavoritos = async () => {
  try {
    let celularesArray = [];
    for (const celular of favoritos.value) {
      const docRef = doc(db, 'celulares', celular);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        celularesArray.push({ id: celular, ...docSnap.data() });
      } else {
        console.warn(`El documento con id ${celular} no existe.`);
      }
    }
    celularesFavoritos.value = celularesArray;
  } catch (error) {
    console.error('Error al obtener los celulares favoritos:', error);
  }
};



const fetchFavoritos = async () => {
  try {
    const docRef = doc(db, 'user', user.value.email);
    const docSnap = await getDoc(docRef);
    favoritos.value = docSnap.data().favoritos;
    fetchCelularesFavoritos()
  } catch (error) {
    console.error('Error al obtener los favoritos:', error);
  }
}


// Llamada a la función al montar el componente
onMounted(() => {

  const userData = localStorage.getItem("user");
  if (userData) {
    user.value = JSON.parse(userData);
  }
  fetchFavoritos()
});
</script>
