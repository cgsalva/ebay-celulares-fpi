<template>
  <q-page class="background-gradient">
    <div class="col-12">
      <q-card class="my-card q-ma-lg q-pb-lg" flat bordered style="width: auto">
        <div class="row q-mt-lg justify-center">

          <q-card-section class="col-12 col-sm-4 q-pb-lg">
            <div class="q-py-md">
              <q-carousel swipeable animated v-model="slide" thumbnails infinite navigation-position="left">
                <q-carousel-slide v-for="(imagen, index) in celular.imagenesURL" :key="index" :name="index"
                  :img-src="imagen" />
              </q-carousel>
            </div>
          </q-card-section>

          <q-card-section class="col-12 col-sm-5">
            <div class="q-pl-md q-py-lg">
              <div class="text-subtitle1 text-grey-8">{{ celular.marca }}</div>
              <div class="text-h5 text-blue-10 q-mb-lg">{{ celular.modelo }}</div>
              <div class="text-subtitle2 text-weight-regular text-grey-8 q-mt-lg">Desde</div>
              <div class="text-h5 text-blue-10 q-mb-sm">${{ celular.precio }}</div>
              <div class="text-subtitle2 text-weight-regular text-grey-8">Incluye IVA</div>
            </div>
            <div class="q-mt-lg">
              <q-input outlined rounded class="q-mb-lg" size="xs" v-model="cantidad" :dense="dense"
                style="width: 150px;">
                <template v-slot:prepend>
                  <q-btn round dense flat icon="remove" @click="decrement" />
                </template>
                <template v-slot:append>
                  <q-btn round dense flat icon="add" @click="cantidad++" />
                </template>
              </q-input>
              <q-btn @click="agregarCarrito" reload rounded color="blue-10" icon="shopping_cart"
                label="añadir al carrito" class="q-mr-xs q-my-sm" />
              <q-btn @click="agregarFavorito" rounded color="blue-10" icon="favorite" label="añadir a favoritos" class="q-my-xs" />
            </div>
          </q-card-section>
        </div>
        <q-separator />
        <div class="column items-center">
          <h2 class="text-h5 text-blue-10 q-my-lg text-center">ESPECIFICACIONES</h2>
          <div style="min-width: 50%;">
            <table class="text-grey-8 text-subtitle1 q-my-lg" style="width: 100%;">
              <tbody>
                <tr>
                  <td><b>Sistema Operativo</b></td>
                  <td class="column items-end">{{ celular.sistemaOperativo }}</td>
                </tr>
                <tr>
                  <td><b>Cámara</b></td>
                  <td class="column items-end">{{ camaras }}</td>
                </tr>
                <tr>
                  <td><b>Cámara Frontal</b></td>
                  <td class="column items-end">{{ celular.camaraFrontal }}</td>
                </tr>
                <tr>
                  <td><b>Pantalla</b></td>
                  <td class="column items-end">Tamaño: {{ celular.tamanioPantalla }}</td>
                </tr>
                <tr>
                  <td><b>RAM</b></td>
                  <td class="column items-end">{{ celular.ram }}</td>
                </tr>
                <tr>
                  <td><b>Almacenamiento</b></td>
                  <td class="column items-end">{{ celular.almacenamiento }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </q-card>

      <q-dialog v-model="alerta" position="top">
      <q-card class="text-center q-py-md" style="width: 350px">
        {{ mensajeAlerta }}
      </q-card>
    </q-dialog>

      <!--
      <div class="row">
        <div class="col-12">
          <div class="text-h5 q-ml-lg">Recomendados</div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <CardCelular />
        </div>
      </div>
    -->
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { db } from "src/boot/firebase";
import { arrayUnion, doc, getDoc, runTransaction, updateDoc } from 'firebase/firestore/lite';
import CardCelular from "../components/CardCelular.vue";
import { useRoute } from "vue-router";

defineOptions({
  name: "DetallesPage",
});


const alerta = ref(false)
const mensajeAlerta = ref('')

const slide = ref('frontal');
const id = useRoute().params.ID; //obtenemos el id de la ruta
const celular = ref([]);
const camaras = ref('')
const userId = ref('') //referencia al id del usuario
const cantidad = ref(1)
const emit = defineEmits(['updateCarrito']);

const agregarFavorito = async () => {
  try {
    const userRef = doc(db, "user", userId.value);
    await runTransaction(db, async (transaction) => {
      const userSnap = await transaction.get(userRef);

      if (!userSnap.exists()) {
        throw new Error("Usuario no encontrado.");
      }

      const userData = userSnap.data();
      const favoritos = Array.isArray(userData.favoritos) ? userData.favoritos : [];

      if (!favoritos.includes(id)) {
        favoritos.push(id);
      }

      transaction.update(userRef, { favoritos });

    });
    mensajeAlerta.value = 'Se añadio a tu lista de favoritos'
    alerta.value = true
    
  } catch (error) {
    console.error("Error al agregar producto a favoritos:", error);
  }
};

const agregarCarrito = async () => {
  try {
    const userRef = doc(db, "user", userId.value);

    await runTransaction(db, async (transaction) => {
      const userSnap = await transaction.get(userRef);

      if (!userSnap.exists()) {
        throw new Error("Usuario no encontrado.");
      }

      const userData = userSnap.data();
      const carrito = Array.isArray(userData.carrito) ? userData.carrito : [];

      // Buscar si el producto ya existe en el carrito
      const productoIndex = carrito.findIndex((item) => item.id === id);

      if (productoIndex !== -1) {
        // Si el producto ya existe, actualizamos la cantidad
        carrito[productoIndex].cantidad += cantidad.value;
      } else {
        // Si el producto no existe, lo agregamos al carrito
        carrito.push({ id: id, cantidad: cantidad.value });
      }

      // Actualizamos el documento del usuario con el carrito actualizado
      transaction.update(userRef, { carrito });
    });

    emit("updateCarrito");
    mensajeAlerta.value = 'Se añadio al carrito'
    alerta.value = true
  } catch (error) {
    console.error("Error al agregar o actualizar producto en el carrito:", error);
  }
};



const decrement = () => {
  if (cantidad.value > 1) cantidad.value--
}

const celularPorID = async () => {
  try {
    const docSnap = await getDoc(doc(db, 'celulares', id));

    if (docSnap.exists()) {
      // Si el documento existe, devuelve los datos
      celular.value = docSnap.data();
      const principal = celular.value.camaraTrasera.Principal
      const granAngular = celular.value.camaraTrasera.Gran_angular
      const macro = celular.value.camaraTrasera.Macro
      const profundidad = celular.value.camaraTrasera.Profundidad
      camaras.value = principal + ' ' + granAngular + ' ' + macro + '' + profundidad
      //return docSnap.data();
    } else {
      // Si el documento no existe
      console.log("No se encontró el documento.");
    }

  } catch (error) {
    console.error("Error al obtener el documento:", error);
  }
};

onMounted(() => {
  const userData = localStorage.getItem("user");
  if (userData) {
    userId.value = JSON.parse(userData).email;
  }
  //verificar que se obtuvo el id
  celularPorID()//llamamos a la funcion para obtener el celular por id
});
</script>
