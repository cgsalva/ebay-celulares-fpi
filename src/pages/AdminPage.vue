<template>
  <q-page>
    <h1 class="text-h6 q-mx-xl">Administrar contenido</h1>
    <div class="q-pa-md flex">

      <div class="q-pa-md" style="max-width: 350px">
        <q-expansion-item icon="filter_alt" label="Agregar Celular">
          <q-item clickable v-ripple>
            <q-item-section>
              <q-select v-model="modelMarca" :options="filtros.marcas" label="Marcas" />
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-input v-model="modelModelo" type="text" label="Modelo" />
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-select v-model="modelAlmacenamiento" :options="filtros.almacenamiento"
                label="Almacenamiento Interno" />
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-select v-model="modelRam" :options="filtros.ram" label="Memoria RAM" />
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-select v-model="modelSistema" :options="filtros.sistema" label="Sistema Operativo" />
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-input v-model="modelVersion" label="Versión de Sistema Operativo" type="number" />
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section>
              <q-select v-model="modelPantalla" :options="filtros.pantalla" label="Pantalla" />
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-input v-model="modelTamanio" label="Tamaño de pantalla" type="number" />
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-input v-model="modelBateria" suffix="mAh" label="Batería" type="number" />
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-input v-model="modelCamaras.frontal" suffix="Mpx" label="Camara Frontal" type="number" />
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-input v-model="modelCamaras.principal" suffix="Mpx" label="Camara Principal" type="number" />
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-input v-model="modelCamaras.granAngular" suffix="Mpx" label="Camara Gran Angular" type="number" />
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-input v-model="modelCamaras.macro" suffix="Mpx" label="Camara Macro" type="number" />
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-input v-model="modelCamaras.profundidad" suffix="Mpx" label="Camara de Profundidad" type="number" />
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section>
              <q-toggle v-model="modelNfc" label="NFC" />
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-input v-model="modelImagenesURL.frontal" label="URL de la imagen frontal" type="url" />
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-input v-model="modelImagenesURL.trasera" label="URL de la imagen trasera" type="url" />
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-input v-model="modelPrecio" @input="validarPrecio" prefix="$" label="Precio" type="number" />
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-btn @click="agregarCelular" color="primary" label="Agregar Celular" />
            </q-item-section>
          </q-item>
        </q-expansion-item>
      </div>
      <!-- Agregar nuevo admin -->
      <div class="q-pa-md" style="max-width: 350px">
        <q-expansion-item icon="filter_alt" label="Agregar Admin">
          <q-item-section clickable v-ripple class="q-mb-md">
            <q-input v-model="modelAdmin" type="text" label="Correo del nuevo admin" />
          </q-item-section>
          <q-item-section clickable v-ripple>
            <q-btn @click="agregarAdmin" color="primary" label="Agregar Admin" />
          </q-item-section>
        </q-expansion-item>
      </div>
      <!-- Agregar más filtros -->
      <!--  <div class="q-pa-md" style="max-width: 350px">
        <q-expansion-item icon="filter_alt" label="Agregar Filtros">
          <q-item-section clickable v-ripple >
            <q-input v-model="modelMarca" type="text" label="Marca" />
          </q-item-section>
        </q-expansion-item>
      </div> -->
    </div>
  </q-page>
</template>
<script setup>
import { ref, onMounted } from 'vue' /* Importamos onMounted para poder  */
import { db } from 'src/boot/firebase'
import { collection, getDocs, addDoc } from 'firebase/firestore/lite';

const filtros = ref([])
//modelo de celular
const modelPrecio = ref(0)
const modelMarca = ref('')
const modelModelo = ref('')
const modelPantalla = ref('')
const modelAlmacenamiento = ref('')
const modelRam = ref('')
const modelSistema = ref('')
const modelVersion = ref('')
const modelTamanio = ref('')
const modelBateria = ref('')
const modelCamaras = ref({ frontal: 0, principal: 0, granAngular: 0, macro: 0, profundidad: 0 })
const modelNfc = ref(false)
const modelImagenesURL = ref({ frontal: '', trasera: '' })

const modelAdmin = ref('')

const validarPrecio = () => {
  if (modelPrecio.value < 0) {
    modelPrecio.value = 0
  }
}

const agregarAdmin = async () => {
  try {
    const admin = {
      email: modelAdmin.value
    }

    const docRef = await addDoc(collection(db, 'admins'), admin);
    modelAdmin.value = ''
  } catch (error) {
    console.error('Error al agregar el admin:', error);
  }
}

const limpiarModelsCelular = () => {
  modelMarca.value = ''
  modelModelo.value = ''
  modelPantalla.value = ''
  modelAlmacenamiento.value = ''
  modelRam.value = ''
  modelSistema.value = ''
  modelVersion.value = ''
  modelTamanio.value = ''
  modelBateria.value = ''
  modelCamaras.value = { frontal: 0, principal: 0, granAngular: 0, macro: 0, profundidad: 0 }
  modelNfc.value = false
  modelImagenesURL.value = { frontal: '', trasera: '' }
  modelPrecio.value = 0
}

const agregarCelular = async () => {
  try {
    const celular = {
      marca: modelMarca.value,
      modelo: modelModelo.value,
      pantalla: modelPantalla.value,
      almacenamiento: modelAlmacenamiento.value,
      ram: modelRam.value,
      sistemaOperativo: modelSistema.value + ' ' + modelVersion.value,
      tamanioPantalla: modelTamanio.value,
      bateria: modelBateria.value ? modelBateria.value + ' mAh' : "",
      camaraFrontal: modelCamaras.value.frontal ? modelCamaras.value.frontal + ' Mpx' : "",
      camaraTrasera: {
        Principal: modelCamaras.value.principal ? modelCamaras.value.principal + ' Mpx' : "",
        Gran_angular: modelCamaras.value.granAngular ? modelCamaras.value.granAngular + ' Mpx' : "",
        Macro: modelCamaras.value.macro ? modelCamaras.value.macro + ' Mpx' : "",
        Profundidad: modelCamaras.value.profundidad ? modelCamaras.value.profundidad + ' Mpx' : ""
      },
      nfc: modelNfc.value ? 'Sí' : 'No',
      imagenesURL: modelImagenesURL.value,
      precio: modelPrecio.value
    }


    const docRef = await addDoc(collection(db, 'celulares'), celular);
    limpiarModelsCelular();
  } catch (error) {
    console.error('Error al agregar el celular:', error);
  }
}

const fetchFiltros = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'filtros'));
    const filtrosArray = querySnapshot.docs.map(doc => doc.data());

    filtros.value = filtrosArray[0];
  } catch (error) {
    console.error('Error al obtener los filtros:', error);
  }
}

onMounted(fetchFiltros)


</script>
