<template>
  <!-- Esta página se muestra cuando un correo no puede entrar en admin -->

  <q-page class="flex flex-center">
    <div>
      <q-card class="q-pa-md">
        <q-card-section>
          <div class="text-h6">No tienes autorización para ver esta página</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="primary" label="Regresar" to="/" />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>
