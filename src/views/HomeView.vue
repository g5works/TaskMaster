<template>
  <div class="home">
    <v-app-bar     
      src="https://picsum.photos/1920/1080"
      color="purple" app dark fixed dense expanded>

      <v-app-bar-nav-icon v-on:click="navexpanded = !navexpanded"><v-icon>{{appbaricon}}</v-icon></v-app-bar-nav-icon>
      <v-app-bar-title>TaskMaster</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-menu>
        <template v-slot:activator="{on, attribute}">
          <v-btn icon v-bind="attribute" v-on="on">
            <v-icon style="mix-blend-mode: difference;">mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link @click="$router.push('/about')">
            <v-list-item-content>
              <v-list-item-title>About TaskMaster</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

      </v-menu>
      <v-divider vertical inset/>
      <v-btn icon @click="recsexpanded = !recsexpanded">
        <v-icon style="mix-blend-mode: difference;">mdi-format-list-numbered</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="navexpanded" color="purple" app>
      <v-list dark>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title style="font-size: 20pt; font-weight: bold;" align="center">TaskMaster</v-list-item-title>
            <v-list-item-subtitle align="center">Version 3 Alpha "Star Dream DA"</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list dark nav dense>
        <v-list-item link @click="dialogopen=true">
          <v-list-item-icon><v-icon>mdi-calendar-plus</v-icon></v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Add new event</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item link>
          <v-list-item-icon><v-icon>mdi-calendar-import</v-icon></v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Import event</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer color="gray" app right width="450px" v-model="recsexpanded">
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title align="center" style="font-size: 20pt; font-weight: bold">Recommendations</v-list-item-title>
            <v-list-item-subtitle align="center">A list of assignments ordered by when you should do them</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-container fluid>

        <v-card v-for="(item, index) in datas" class="mb-2" :key="index">
          <v-sheet align="center" :color="setcolor(index)" height="20" width="100%" style="font-size: 11pt;">{{setname(index)}}</v-sheet>
          <v-card-title>{{item.name}}</v-card-title>
          <v-card-subtitle>Due in:&nbsp;{{updateduein(index)}}&nbsp;days</v-card-subtitle>
        </v-card>
        

      </v-container>
    </v-navigation-drawer>


    <v-main>
      <v-container fluid>

        <v-card v-for="(item, index) in datas" class="mb-2" :key="index">
          <v-sheet align="center" :color="setcolor(index)" height="20" width="100%" style="font-size: 11pt;">{{setname(index)}}</v-sheet>
          <v-card-title>{{item.name}}</v-card-title>
          <v-card-subtitle>Notes:&nbsp;{{item.notes}}</v-card-subtitle>
        </v-card>
        
        <v-container fill-height>
            <v-row justify="center" align="center">
                <v-col cols="1200" sm="9">

                  <div v-if="notaskswindow">                  
                    <p align="center" justify="center" style="font-size: 5vh;">Haven't added anything yet?</p>
                    <p align="center" justify="center" style="font-size: 3vh; color: gray;">Here's some things you should do!</p>
                    
                    <v-card outlined class="pa-1" link @click="dialogopen = true">
                      <v-card-title ><v-icon>mdi-calendar-plus</v-icon>&nbsp;Add a new event</v-card-title>  
                    </v-card>
                    <br>
                    <v-card outlined class="pa-1" link>
                      <v-card-title><v-icon>mdi-calendar-import</v-icon>&nbsp;Import an event file</v-card-title>
                    </v-card>
                  </div>

                  <v-dialog v-model="dialogopen" width="600">
                    <v-card>
                      <v-card-title background-color="purple" class="text-h4 purple">Add event</v-card-title>
                      <v-container>
                        <v-text-field filled label="Enter event name" v-model="eventname"></v-text-field>
                        <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="date"
                        transition="scroll-y-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="date"
                            label="Pick a date"
                            prepend-icon="mdi-calendar"
                            filled
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="date"
                          scrollable
                        >
                        <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="pink"
                            @click="menu = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="pink"
                            @click= "$refs.menu.save(date)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                        <v-btn-toggle mandatory style="width:100%;" color="purple" v-model="type" @click="()=>{console.log(type)}">
                          <v-btn>&nbsp;&nbsp;&nbsp;Summative&nbsp;&nbsp;&nbsp;</v-btn>
                          <v-btn>&nbsp;&nbsp;&nbsp;Formative&nbsp;&nbsp;&nbsp;</v-btn>
                          <v-btn>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Informative&nbsp;&nbsp;&nbsp;&nbsp;</v-btn>
                          <v-btn>&nbsp;&nbsp;&nbsp;&nbsp;Other&nbsp;&nbsp;&nbsp;&nbsp;</v-btn>
                        </v-btn-toggle>
                        <br><br>
                        <v-textarea filled counter label="Event Notes" v-model="notes"></v-textarea>
                        <v-spacer/>
                        
                      </v-container>
                      <v-card-actions>
                        <v-spacer/>
                          <v-btn text color="purple" @click="dialogopen=false">Cancel</v-btn>
                          <v-btn text color="purple" @click="() => {pushtoarray(), pushtojson(), dialogopen=false}">Create</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>

                </v-col>
            </v-row>
        </v-container>

      </v-container>
      
    </v-main>
  </div>
 
</template>




<script lang="js">
import Vue from 'vue';
import * as tauri from "@tauri-apps/api"

Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      console.log(event)
      // here I check that click was outside the el and his children
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
});

export default Vue.extend({
  name: 'App',



  data: function() {
    return {
      message: "renderer",
      navexpanded: false,
      recsexpanded: false,
      addexpanded: false,
      notaskswindow: true,
      appbaricon: "mdi-menu",
      dialogopen: false,
      menu: false,
      datas: undefined,


      eventname: undefined,
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      notes: undefined,
      type: undefined,
    }
  },

  watch: {
    navexpanded (val){
      if (val){
        this.appbaricon = "mdi-arrow-collapse-left"
      }
      else{
        this.appbaricon = "mdi-menu"
      }
    },

    datas (val){
      if (val.length > 0){this.notaskswindow = false;}
    }
  },

  methods:{
    changeapp (){
      if (this.addexpanded){
        this.addexpanded = false
      }
    },
    pushtoarray(){
      this.datas.push({id:"identifier", name: this.eventname, notes: this.notes, type: this.type+1, date: this.date});
    },
    pushtojson(){
      var jsoned = JSON.stringify(this.datas)
      tauri.fs.createDir("TaskMasterData", {dir: tauri.fs.BaseDirectory.Document})
      tauri.fs.writeFile({contents: jsoned, path: "TaskMasterData/user.json"}, {dir: tauri.fs.BaseDirectory.Document})      
    },
    setname(index){
      if (this.datas[index].type == 1){
        return "Summative"
      }
      else if (this.datas[index].type == 2){
        return "Formative"
      }
      else if (this.datas[index].type == 3){
        return "Informative"
      }
      else {
        return "Other"
      }
    },
    setcolor(index){
      if (this.datas[index].type == 1){
        return "red"
      }
      else if (this.datas[index].type == 2){
        return "blue"
      }
      else if (this.datas[index].type == 3){
        return "green"
      }
      else {
        return "orange"
      }
    },
    updateduein(index){
      var today = new Date()
      var setdate = new Date(this.datas[index].date)

      var diff = (setdate.getTime()-today.getTime())/86400000
      
      return Math.ceil(diff)
    }

  },
  mounted() {
    tauri.fs.readTextFile("TaskMasterData/user.json", {dir: tauri.fs.BaseDirectory.Document}).then((val) => {
      var jsonc = JSON.parse(val)
      this.datas = jsonc
    })
  }
});

</script>

<style lang="scss">

</style>
