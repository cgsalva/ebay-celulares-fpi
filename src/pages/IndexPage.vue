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
      <div class="col-12 col-sm-9">
        <CardCelular title="Samsung Galaxy A15" price="149.99" imageUrl="https://m.media-amazon.com/images/I/61cl1NEIrdL.jpg" />
        <CardCelular title="Honor X5" price="80" imageUrl="https://citycellmx.com/wp-content/uploads/2024/03/HONOR-X5.png" />
        <CardCelular title="Samsung Galaxy A25" price="240" imageUrl="https://www.sagitariodigital.com.ar/wp-content/uploads/2024/01/A25-1.jpg" />
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
