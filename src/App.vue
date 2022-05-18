

<template>
  <div class="container app">
    <div class="row app-one">
      <RouterView />
    </div>
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import { provide } from 'vue'
import firebaseMessaging from './firebase'



export default {
  //options api
  provide: {
    messaging: firebaseMessaging
  },
  //composition api
  setup() {
    provide('messaging', firebaseMessaging)
  }
}
</script>


