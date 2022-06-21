<template>
  <div class="about">
    <v-app-bar     
      src="https://picsum.photos/1920/1080"
      color="purple" app dark fixed dense expanded>

        <v-app-bar-nav-icon @click="$router.push('/home')"><v-icon>mdi-arrow-left</v-icon></v-app-bar-nav-icon>
        <v-app-bar-title>TaskMaster</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <div align="center">
          <v-img src="../../media/logo.svg" max-height="400px" max-width="400px"/>
          <v-text style="font-size: 40pt; font-weight: bold">About TaskMaster</v-text><br>
          <v-text style="font-size: 15pt; font-weight: bold">Version 1.0.0b "Star Dream Beta"</v-text><br>
          <v-text style="font-size: 15pt; font-weight: bold">Release Validation Test 3</v-text><br/>
          <v-text style="font-size: 15pt; font-weight: bold">Not a Public/Public Beta build</v-text><br><br>
          <v-text style="font-size: 40pt; font-weight: bold">Tools Used</v-text><br>
          <img src="../../media/tauri_with_wordmark.svg" style="max-height: 50px; max-width: 200px; display: inline-block"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <img src="../../media/vue.svg" style="max-height: 50px; max-width: 50px; display: inline-block"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <img src="../../media/vuetify-logo-dark-atom.svg" style="max-height: 50px; max-width: 50px; display: inline-block"/>
          <br><br>
          <v-text style="font-size: 40pt; font-weight: bold">About Your {{comptype}}</v-text><br>
          <v-text style="font-size: 15pt; font-weight: bold">Computer Architecture: {{arch}}</v-text><br>
          <v-text style="font-size: 15pt; font-weight: bold">Temp Directory: {{tempdir}}</v-text><br>
          <v-text style="font-size: 15pt; font-weight: bold">Kernel/Operating System Version: {{kernel}}</v-text><br>

          
        </div>
      </v-container>

    </v-main>  
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import * as tauri from "@tauri-apps/api"







export default Vue.extend({
  name: 'App',

  data: function() {
    return {
      nolinux: false,

      comptype: "none",
      arch: "none",
      tempdir: "none",
      kernel: "none"
    }
  },

  methods:{

  },
  mounted(){
    tauri.os.type().then((value: string) => {
      switch (value){
        case "Linux":{
          this.comptype = "Linux PC"
          return
        }
        case "Darwin":{
          this.comptype = "Mac"
          return
        }
        case "Windows_NT":{
          this.comptype = "Windows PC"
          return
        }
      }
    })

    tauri.os.version().then((value: string) => {
      this.kernel = value;
    })
    tauri.os.tempdir().then((value: string) => {
      this.tempdir = value;
    })
    tauri.os.arch().then((value: string) => {
      this.arch = value;
    })
  }
});

</script>
