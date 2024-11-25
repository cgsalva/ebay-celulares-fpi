<template>
  <q-page>
    <!--<h1 class="text-h6 q-mx-xl">Administrar contenido</h1>-->


      <!-- Agregar nuevo admin -->
      <!--
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
    -->
      <!-- Agregar más filtros -->
      <!--  <div class="q-pa-md" style="max-width: 350px">
        <q-expansion-item icon="filter_alt" label="Agregar Filtros">
          <q-item-section clickable v-ripple >
            <q-input v-model="modelMarca" type="text" label="Marca" />
          </q-item-section>
        </q-expansion-item>
      </div> -->


    <div class="q-pa-md">
      <!-- TABLA DE CELULAREAS -->
      <q-table
        flat bordered
        :rows="celulares"
        :columns="columns"
        row-key="name"
        :filter="filter"
        >
        <template v-slot:top-left>
          <q-input outlined  dense debounce="300" v-model="filter" placeholder="Buscar celular">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn @click="modalCelular = true" color="primary" class="q-mx-sm" icon="add" size="sm" round />
        </template>
        <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="marca" :props="props">
                {{ props.row.marca }}
              </q-td>
              <q-td key="modelo" :props="props">
                {{ props.row.modelo }}
              </q-td>
              <q-td key="os" :props="props">
                {{ props.row.sistemaOperativo }}
              </q-td>
              <q-td key="precio" :props="props">
                ${{ props.row.precio }}
              </q-td>
              <q-td key="imagenUrl" :props="props">
                <img :src="props.row.imagenesURL.frontal" width="50px">
              </q-td>
              <q-td key="opcionEliminar" :props="props">
                <q-btn round color="red" icon="delete" size="sm" @click="openModalConfirmDelete(props.row.id)" />
              </q-td>
            </q-tr>
          </template>
      </q-table>

      <!-- MODAL CELULAR -->
      <q-dialog 
        v-model="modalCelular" 
        maximized
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <q-card class="q-px-lg">
          <q-toolbar class="q-mb-lg">
            <q-toolbar-title class="text-center">Nuevo Celular</q-toolbar-title>
            <q-btn flat v-close-popup round dense size="sm" icon="close" />
          </q-toolbar>
          <q-card-section class="q-pt-none">
            <q-list highlight>
              <div class="row">
                <div class="col-12 col-md-6">
                  <div class="row">
                    <div class="col-12 col-md-6">
                      <q-item>
                        <q-item-section>
                          <q-select outlined v-model="modelMarca" :options="filtros.marcas" label="Marca" />
                        </q-item-section>
                      </q-item>
                    </div>
                    <div class="col-12 col-md-6">
                      <q-item>
                        <q-item-section>
                          <q-input outlined v-model="modelModelo" type="text" label="Modelo" />
                        </q-item-section>
                      </q-item>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 col-md-6">
                      <q-item>
                        <q-item-section>
                          <q-select outlined v-model="modelAlmacenamiento" :options="filtros.almacenamiento"
                            label="Almacenamiento Interno" />
                        </q-item-section>
                      </q-item>
                    </div>
                    <div class="col-12 col-md-6">
                      <q-item>
                        <q-item-section>
                          <q-select outlined v-model="modelRam" :options="filtros.ram" label="Memoria RAM" />
                        </q-item-section>
                      </q-item>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 col-md-6">
                      <q-item>
                        <q-item-section>
                          <q-select outlined v-model="modelSistema" :options="filtros.sistema" label="Sistema Operativo" />
                        </q-item-section>
                      </q-item>
                    </div>
                    <div class="col-12 col-md-6">
                      <q-item>
                        <q-item-section>
                          <q-input outlined v-model="modelVersion" label="Versión de Sistema Operativo" type="number" />
                        </q-item-section>
                      </q-item>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 col-md-6">
                      <q-item>
                        <q-item-section>
                          <q-select outlined v-model="modelPantalla" :options="filtros.pantalla" label="Pantalla" />
                        </q-item-section>
                      </q-item>
                    </div>
                    <div class="col-12 col-md-6">
                      <q-item>
                        <q-item-section>
                          <q-input outlined v-model="modelTamanio" label="Tamaño de pantalla" type="number" />
                        </q-item-section>
                      </q-item>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 col-md-6">
                      <q-item>
                        <q-item-section>
                          <q-input outlined v-model="modelBateria" suffix="mAh" label="Batería" type="number" />
                        </q-item-section>
                      </q-item>
                    </div>
                    <div class="col-12 col-md-6">
                      <q-item>
                        <q-item-section>
                          <q-input outlined v-model="modelPrecio" @input="validarPrecio" prefix="$" label="Precio" type="number" />
                        </q-item-section>
                      </q-item>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 col-md-6">
                      <q-item>
                        <q-item-section>
                          <q-toggle v-model="modelNfc" label="NFC" />
                        </q-item-section>
                      </q-item>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <div class="row">
                    <div class="col-12 col-md-6">
                      <q-item>
                        <q-item-section>
                          <q-input outlined v-model="modelCamaras.principal" suffix="Mpx" label="Camara Principal" type="number" />
                        </q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section>
                          <q-input outlined v-model="modelCamaras.frontal" suffix="Mpx" label="Camara Frontal" type="number" />
                        </q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section>
                          <q-input outlined v-model="modelCamaras.granAngular" suffix="Mpx" label="Camara Gran Angular" type="number" />
                        </q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section>
                          <q-input outlined v-model="modelCamaras.macro" suffix="Mpx" label="Camara Macro" type="number" />
                        </q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section>
                          <q-input outlined v-model="modelCamaras.profundidad" suffix="Mpx" label="Camara de Profundidad" type="number" />
                        </q-item-section>
                      </q-item>
                    </div>
                    <div class="col-12 col-md-6">
                      <q-item>
                        <q-item-section>
                          <q-input outlined v-model="modelImagenesURL.frontal" label="URL de la imagen frontal" type="url" />
                        </q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section>
                          <q-input outlined v-model="modelImagenesURL.trasera" label="URL de la imagen trasera" type="url" />
                        </q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section>
                          <q-carousel swipeable v-model="slide" thumbnails infinite navigation-position="left"
                          style="width: 200px; height: 200px; padding-left:50px;">
                            <q-carousel-slide
                              v-for="(imagen, index) in modelImagenesURL"
                              :key="index"
                              :name="index"
                              :img-src="imagen"
                            />
                          </q-carousel>
                        </q-item-section>
                      </q-item>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row q-mt-lg">
                <div class="col-12">
                  <q-item>
                    <q-btn label="Guardar" color="primary" @click="agregarCelular" v-close-popup />
                  </q-item>
                </div>
              </div>
            </q-list>
          </q-card-section>
        </q-card>
      </q-dialog>
      <!-- MODAL PARA CONFIRMACION DE ELIMINAR UN CELULAR -->
      <q-dialog v-model="modalConfirmDelete" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="delete_forever" size="lg"  color="red" text-color="white" />
            <span class="q-ml-sm">¿Estas seguro que deseas eliminar este celular?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="CANCELAR" color="black" v-close-popup />
            <q-btn flat label="SI" color="black" @click="eliminarCelular" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

  </q-page>
</template>
<script setup>
import { ref, onMounted } from 'vue' /* Importamos onMounted para poder  */
import { db } from 'src/boot/firebase'
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore/lite';

const slide = ref('frontal');

const columns = [
  { name: 'marca', align: 'center', label: 'Marca', field: 'marca', sortable: true },
  { name: 'modelo', align: 'center', label: 'Modelo', field: 'modelo', sortable: true },
  { name: 'os', align: 'center', label: 'Sistema Operativo', field: 'os', sortable: true },
  { name: 'precio', align: 'center', label: 'Precio', field: 'precio', sortable: true },
  { name: 'imagenUrl', align: 'center', label: '', field: 'imagenUrl', sortable: false },
  { name: 'opcionEliminar', align: 'center', label: '', field: 'opcionEliminar', sortable: false },
]
const modalConfirmDelete = ref(false)

const idCelularEliminar = ref(null)

const openModalConfirmDelete = id => {
  idCelularEliminar.value = id
  modalConfirmDelete.value = true
}

const eliminarCelular = async () => {
  await deleteDoc(doc(db, 'celulares', idCelularEliminar.value))
  fetchCelulares()
}

const filter = ref('')

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

const modalCelular = ref(false)

const celulares = ref([]);

const celular = ref({})

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
    fetchCelulares()
  } catch (error) {
    console.error('Error al agregar el celular:', error);
  }
}

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

const fetchFiltros = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'filtros'));
    const filtrosArray = querySnapshot.docs.map(doc => doc.data());

    filtros.value = filtrosArray[0];
  } catch (error) {
    console.error('Error al obtener los filtros:', error);
  }
}

onMounted(() => {
  fetchFiltros()
  fetchCelulares()
})

</script>
