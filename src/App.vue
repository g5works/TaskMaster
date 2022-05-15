<template>
  <v-app id="vue">
    <v-system-bar v-if="nolinux" style="padding-right: 0px;" app color="#2b2b2b" data-tauri-drag-region>
      TaskMaster
      <v-spacer/>
      <v-btn icon tile color="blue" @click="mini"><v-icon style="margin:0px;" small>mdi-minus</v-icon></v-btn>
      <v-btn icon tile color="blue" @click="maxi"><v-icon style="margin:0px;" small>mdi-crop-square</v-icon></v-btn>
      <v-btn icon tile color="red" @click="close"><v-icon style="margin:0px;" small>mdi-close</v-icon></v-btn>      
    </v-system-bar>
    <router-view/>
  </v-app>
</template>

<script lang="js">
import Vue from 'vue';



const win = window.__TAURI__.window.appWindow



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
    window.__TAURI__.os.type().then((value) => {
      if (value == "Linux"){
        this.nolinux = false;
      }
      else{
        this.nolinux = true;
      }
    })
  }
});

</script>