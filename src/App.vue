<template>
  <v-app id="vue">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

import * as tauri from "@tauri-apps/api"

const win = tauri.window.appWindow





export default Vue.extend({
  name: 'App',

  data: function() {
    return {
      nolinux: false,
    }
  },
});

</script>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>