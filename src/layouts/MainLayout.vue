<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">

      <q-toolbar>

        <q-btn flat no-caps no-wrap to="/" class="q-ml-xs" v-if="$q.screen.gt.xs">
          <q-toolbar-title shrink class="text-weight-bold">
            Ebay Celulares
          </q-toolbar-title>
        </q-btn>

        <q-space />

        <div class="YL__toolbar-input-container row no-wrap sm">
          <q-input dense outlined square v-model="search" placeholder="Buscar dispositivo" class="bg-white col" />
          <q-btn class="YL__toolbar-input-btn" color="grey-3" text-color="grey-8" icon="search" unelevated />

        </div>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn-dropdown dense flat color="grey-8" icon="shopping_cart">
            <template v-slot:label>
              <q-badge color="red" text-color="white" floating>
                2
              </q-badge>
            </template>
            <q-tooltip>Compra</q-tooltip>
            <q-list>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section avatar>
                  <q-avatar icon="smartphone" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Samsung</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section avatar>
                  <q-avatar icon="phone_iphone" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Iphone</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-btn v-if="mostrar == true" @click="loginGoogle" color="primary" label="Iniciar Sesión" class="q-mx-md" />
          <q-btn-dropdown v-if="mostrar == false" round flat>
            <template v-slot:label>
              <q-avatar size="26px">
                <img :src="user.photoURL">
              </q-avatar>
            </template>

            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label>{{ user.displayName }}</q-item-label>
                  <q-item-label caption>{{ user.email }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-if="isAdmin == true">
                <q-btn to="/admin" color="primary" label="Administrar"/>
              </q-item>
              <q-item>
                <q-btn @click="cerrarSesion" to="/" color="secondary" label="Cerrar Sesión" />
              </q-item>
            </q-list>
          </q-btn-dropdown>

        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore/lite';
import { auth, db, provider } from 'src/boot/firebase';
import { onMounted, ref } from 'vue';

const user = ref([])
const mostrar = ref(true)
const isAdmin = ref(false)


const loginGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    user.value = result.user;

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
  fetchAdmins()
})

</script>
