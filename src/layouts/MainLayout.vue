<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">

      <q-toolbar>

        <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
          <q-toolbar-title shrink class="text-weight-bold">
            Ebay Celulares
          </q-toolbar-title>
        </q-btn>

        <q-space />

        <div class="YL__toolbar-input-container row no-wrap">
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
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { fabYoutube } from '@quasar/extras/fontawesome-v6'

export default {
  name: 'MyLayout',

  setup() {
    const leftDrawerOpen = ref(false)
    const search = ref('')

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    return {
      fabYoutube,

      leftDrawerOpen,
      search,

      toggleLeftDrawer,

      links1: [
        { icon: 'home', text: 'Home' },
        { icon: 'whatshot', text: 'Trending' },
        { icon: 'subscriptions', text: 'Subscriptions' }
      ],
      links2: [
        { icon: 'folder', text: 'Library' },
        { icon: 'restore', text: 'History' },
        { icon: 'watch_later', text: 'Watch later' },
        { icon: 'thumb_up_alt', text: 'Liked videos' }
      ],
      links3: [
        { icon: fabYoutube, text: 'YouTube Premium' },
        { icon: 'local_movies', text: 'Movies & Shows' },
        { icon: 'videogame_asset', text: 'Gaming' },
        { icon: 'live_tv', text: 'Live' }
      ],
      links4: [
        { icon: 'settings', text: 'Settings' },
        { icon: 'flag', text: 'Report history' },
        { icon: 'help', text: 'Help' },
        { icon: 'feedback', text: 'Send feedback' }
      ],
      buttons1: [
        { text: 'About' },
        { text: 'Press' },
        { text: 'Copyright' },
        { text: 'Contact us' },
        { text: 'Creators' },
        { text: 'Advertise' },
        { text: 'Developers' }
      ],
      buttons2: [
        { text: 'Terms' },
        { text: 'Privacy' },
        { text: 'Policy & Safety' },
        { text: 'Test new features' }
      ]
    }
  }
}
</script>

<style lang="sass">
.YL

  &__toolbar-input-container
    min-width: 100px
    width: 55%

  &__toolbar-input-btn
    border-radius: 0
    border-style: solid
    border-width: 1px 1px 1px 0
    border-color: rgba(0,0,0,.24)
    max-width: 60px
    width: 100%

  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem

    &:hover
      color: #000
</style>
