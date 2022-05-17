<template>
  <v-app id="vue">
    <v-system-bar v-if="nolinux" style="padding-right: 0px;" app color="#2b2b2b" data-tauri-drag-region>
      TaskMaster
      <v-spacer/>
      <v-btn icon tile color="blue" @click="mini"><v-icon style="margin:0px;" small>mdi-minus</v-icon></v-btn>
      <v-btn icon tile color="blue" @click="maxi"><v-icon style="margin:0px;" small>mdi-crop-square</v-icon></v-btn>
      <v-btn icon tile color="red" @click="close"><v-icon style="margin:0px;" small>mdi-close</v-icon></v-btn>      
    </v-system-bar>
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

  methods:{
    
    close: function() {win.close()},
    maxi: function() {win.toggleMaximize()},
    mini: function() {win.minimize()}
  },
  mounted(){
    tauri.os.type().then((value: string) => {
      if (value == "Linux" || value == "Darwin"){
        this.nolinux = false;
      }
      else{
        this.nolinux = true;
      }
    })
  }
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