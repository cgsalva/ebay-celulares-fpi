<template>
  <q-page class="background-gradient">
    <div class="col-12">
      <div class="row">
        <div class="col-12 col-sm -7">
          <div class="q-pa-md">
            <q-carousel swipeable animated v-model="slide" thumbnails infinite navigation-position="left">
              <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
              <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
              <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
              <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
            </q-carousel>
          </div>
        </div>
        <div class="col-12 col-sm-5">
          <q-card class="my-card q-ma-sm" flat bordered style="width: auto">
            <q-card-section>
              <div class="col-12 text-h5 q-mb-xs">
                Nombres del celular:{{ celular.marca }} {{ celular.modelo }}
              </div>
            </q-card-section>
            <q-card-section>
              <div class="col-12 text-subtitle1 q-mb-xs">
                Precio: ${{ celular.precio }}
              </div>
            </q-card-section>

            <q-separator />
            <q-card-section>
              <div class="col-12 text-body1 q-mb-xs">
                Caracteristicas principales:(inserte union a db*)
              </div>
            </q-card-section>
            <q-card-section>
              <div class="col-12 text-body1 q-mb-xs">
                <q-btn outline rounded color="primary" label="añadir al carro" style="width: 100%" />
              </div>
            </q-card-section>
            <q-card-section>
              <div class="col-12 text-body1 q-mb-xs">
                <q-btn outline rounded color="primary" label="añadir a la lista de favoritos" style="width: 100%" />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <q-card class="my-card" flat bordered>
            <q-card-section>
              <div class="col-12 text-body1 q-mb-xs">
                Mas informacion:(inserte union a db*)
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <div class="col-12 text-body1 q-mb-xs">
                Texto detallado:(inserte union a db*)
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12">
          <div class="text-h5 q-ml-lg">Articulos similares</div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <CardCelular />
        </div>
        <div class="col">
          <CardCelular />
        </div>
        <div class="col">
          <CardCelular />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="text-h5 q-ml-lg">los clientes tambien compraron</div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <CardCelular />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { db } from "src/boot/firebase";
import { collection, getDocs, doc, getDoc } from 'firebase/firestore/lite';
import CardCelular from "../components/CardCelular.vue";
import { useRoute } from "vue-router";

defineOptions({
  name: "DetallesPage",
});

const slide = ref(1);
const id = useRoute().params.ID; //obtenemos el id de la ruta
const celular = ref([]);

const celularPorID = async () => {
  try {  
    const docSnap = await getDoc(doc(db, 'celulares', id));

    if (docSnap.exists()) {
      // Si el documento existe, devuelve los datos
      console.log("Datos del documento:", docSnap.data());
      celular.value = docSnap.data();
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
  console.log("ID:", id);//verificar que se obtuvo el id
  celularPorID()//llamamos a la funcion para obtener el celular por id
});

</script>
