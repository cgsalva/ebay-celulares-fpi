<template>
  <q-page class="q-pa-lg">
    <div class="row">
      <div class="col-12 col-md-3">
        <FiltrosCelulares />
      </div>
      <div class="col-12 col-md-9 justify-content-center">
        <CardCelular />
        <CardCelular />
        <CardCelular />
      </div>
    </div>
    
  </q-page>
</template>

<script setup>

import FiltrosCelulares from '../components/FiltrosCelulares.vue'
import CardCelular from '../components/CardCelular.vue'

defineOptions({
  name: 'IndexPage'
});

</script>
