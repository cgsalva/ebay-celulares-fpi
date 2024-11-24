<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">

      <q-toolbar>

        <q-btn flat no-caps no-wrap to="/" class="q-ml-xs" v-if="$q.screen.gt.xs">
          <q-toolbar-title shrink class="text-weight-bold">
            Smartphone Store
          </q-toolbar-title>
        </q-btn>

        <q-space />

        <div class="YL__toolbar-input-container row no-wrap sm">
          <q-input dense outlined square v-model="search" placeholder="Buscar dispositivo" class="bg-white col" />
          <q-btn class="YL__toolbar-input-btn" color="grey-3" text-color="grey-8" icon="search" unelevated />

        </div>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">

          <q-btn-dropdown flat color="grey-8" rounded icon="shopping_cart">
            <template v-slot:label>
              <q-badge color="red" text-color="white" floating>
                {{ carrito.length }}
              </q-badge>
            </template>
            <q-tooltip>Compra</q-tooltip>
            <q-list>
              <q-item v-for="(telefono, index) in celulares" :key="index" clickable v-close-popup>
                <q-item-section avatar>
                  <q-avatar icon="smartphone" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ telefono.marca + ' ' + telefono.modelo }}</q-item-label>
                  <div class="text-subtitle1">${{ telefono.precio }}</div>
                </q-item-section>
                <q-item-section >
                  <q-btn @click="eliminarCarrito(telefono.id, telefono.precio)" icon="delete" flat />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Total</q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label>${{ total }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>

          <q-btn v-if="mostrar == true" @click="loginGoogle" color="primary" label="Iniciar Sesión" class="q-mx-md" />

          <q-btn-dropdown v-if="mostrar == false" rounded flat>
            <template v-slot:label>
              <q-avatar size="26px">
                <img :src="user.photoURL">
              </q-avatar>
            </template>

            <q-list separator style="width: 250px;">
              <q-item class="q-py-md">
                <q-item-section avatar>
                  <q-avatar round>
                    <img :src="user.photoURL">
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ user.displayName }}</q-item-label>
                  <q-item-label caption>{{ user.email }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/admin" v-if="isAdmin == true">
                <q-item-section avatar>
                  <q-icon color="primary" name="settings" />
                </q-item-section>
                <q-item-section>Administrar</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon color="red" name="favorite" />
                </q-item-section>
                <q-item-section>Favoritos</q-item-section>
              </q-item>
              <q-item clickable v-ripple @click="cerrarSesion">
                <q-item-section avatar>
                  <q-icon color="grey-10" name="logout" />
                </q-item-section>
                <q-item-section>Cerrar Sesión</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>

        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view @updateCarrito="fetchCarrito" />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { collection, getDocs, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore/lite';
import { auth, db, provider } from 'src/boot/firebase';
import { onMounted, ref } from 'vue';

const user = ref([])
const mostrar = ref(true)
const isAdmin = ref(false)
const carrito = ref([])
const celulares = ref([])
const total = ref(0)
const eliminarCarrito = async (id, precio) => {
  try {
    const userRef = doc(db, "user", user.value.email);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
    const newCarrito = userData.carrito.filter(celular => celular !== id);
    await updateDoc(userRef, { carrito: newCarrito });
    total.value -= precio
    fetchCarrito()
  } catch (error) {
    console.error('Error al eliminar el celular del carrito:', error);
  }
}

const fetchCelularesCarrito = async () => {
  try {
    let celularesArray = [];
    total.value = 0
    for (const celularId of carrito.value) {
      const docRef = doc(db, 'celulares', celularId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        celularesArray.push({ id: celularId, ...docSnap.data() });
        total.value += Number(docSnap.data().precio)
      } else {
        console.warn(`El documento con id ${celularId} no existe.`);
      }
    }
    celulares.value = celularesArray;
  } catch (error) {
    console.error('Error al obtener los celulares del carrito:', error);
  }
};


const fetchCarrito = async () => {
  try {
    const docRef = doc(db, 'user', user.value.email);
    const docSnap = await getDoc(docRef);
    carrito.value = docSnap.data().carrito;
    fetchCelularesCarrito()
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
  }
}

const loginGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    user.value = result.user;
    const docRef = doc(db, "user", user.value.email);
    await setDoc(docRef, {carrito: []});
    mostrar.value = false
  } catch (error) {
    console.error('Error al iniciar sesión con Google:', error);
  }
};

const cerrarSesion = async () => {
  try {
    await auth.signOut();
    user.value = [];
    mostrar.value = true
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    // Guarda datos relevantes del usuario en localStorage
    const userData = {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
    };
    localStorage.setItem("user", JSON.stringify(userData));
  } else {
    // Limpia localStorage si no hay usuario
    localStorage.removeItem("user");
  }
  fetchAdmins()
})

const fetchAdmins = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'admins'));
    const adminsArray = querySnapshot.docs.map(doc => doc.data());

    const admin = adminsArray.find(admin => admin.email === user.value.email);

    if (admin) {
      isAdmin.value = true;
    } else {
      isAdmin.value = false;
    }
  } catch (error) {
    console.error('Error al obtener los admins:', error);
  }
}

onMounted(() => {
  const userData = localStorage.getItem("user");
  if (userData) {
    user.value = JSON.parse(userData);
    mostrar.value = false
  }
  fetchCarrito()
  fetchAdmins()
})

</script>
