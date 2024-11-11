<template>
  <div class="q-pa-lg row q-gutter-md text-center" style="display: inline-block">
    <q-card class="my-card" bordered style="width: 250px">
      <q-img style="height: 250px;"
        :src="props.imageUrl"
      />
      <q-card-section>
        <div class="text-h6 q-mb-xs">{{ title }}</div>
        <div class="text-subtitle1 q-mt-sm">${{ price }}</div>
      </q-card-section>

      <q-card-actions class="q-mb-sm">
        <q-btn rounded color="primary" to="detalle" label="Ver más" class="q-mx-lg" style="width: 100%;" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<!--
<template>
   <q-card class="my-card">
      <q-card-section horizontal>
        <q-img
          class="col"
          src="https://cdn.quasar.dev/img/parallax2.jpg"
        />

        <q-card-actions vertical class="justify-around">
          <q-btn flat round color="red" icon="favorite" />
          <q-btn flat round color="accent" icon="bookmark" />
          <q-btn flat round color="primary" icon="share" />
        </q-card-actions>
      </q-card-section>
    </q-card>
</template>-->

<script setup>
const props = defineProps({
  imageUrl: String,
  title: String,
  price: Number
})


</script>