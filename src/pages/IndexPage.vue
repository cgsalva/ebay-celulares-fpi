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
