<template>
  <div class="home">
    <v-app-bar     
      src="https://picsum.photos/1920/1080"
      color="purple" app dark fixed dense expanded>

      <v-app-bar-nav-icon v-on:click="navexpanded = !navexpanded"><v-icon>{{appbaricon}}</v-icon></v-app-bar-nav-icon>
      <v-app-bar-title>TaskMaster Beta Star Dream</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-slide-x-reverse-transition>
        <v-btn text v-if="collapsevisible" @click="closepanels">
          collapse all
        </v-btn>

      </v-slide-x-reverse-transition>
      <v-slide-x-reverse-transition><v-divider v-if="collapsevisible" vertical inset/></v-slide-x-reverse-transition>
              

      <v-menu transition="scroll-x-transition">
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
      <v-btn icon @click="recslock()">
        <v-icon style="mix-blend-mode: difference;">mdi-format-list-numbered</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="navexpanded" color="purple" app>
      <v-list dark>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title style="font-size: 20pt; font-weight: bold;" align="center">Add</v-list-item-title>
            <v-list-item-subtitle align="center">Add/Import events to the Task List</v-list-item-subtitle>
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
        
        <v-list-item link @click="launchopendialog()">
          <v-list-item-icon><v-icon>mdi-calendar-import</v-icon></v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Import event</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer color="gray" app right width="450px" :disable-resize-watcher="notaskswindow" v-model="recsexpanded">
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

        <v-card v-for="(item, index) in prioritysortedarray" class="mb-2" :key="index">
          <v-sheet dark align="center" :color="setcolor(item)" height="20" width="50%" style="font-size: 11pt;" class="d-inline-block rounded-tr-0">{{setname(item)}}</v-sheet>
          <v-sheet dark align="center" :color="updateduein(item)[1]" height="20" width="50%" style="font-size:11pt;" class="d-inline-block rounded-tr">{{updateduein(item)[0]}}</v-sheet>
          <v-card-title>{{item.name}}</v-card-title>
          <v-card-subtitle>Due date:&nbsp;{{item.date}}</v-card-subtitle>
        </v-card>
        

      </v-container>
    </v-navigation-drawer>


    <v-main>
      <v-container fluid>
        
        <v-expansion-panels
          v-model="panel"
          multiple
        >
          <v-scroll-x-transition leave-absolute>
          <v-expansion-panel v-for="(content, data) in typesortedarray" :key="data">
            <v-expansion-panel-header>
              <v-row no-gutters>
                <v-col cols="4" class="font-weight-bold">
                  {{new Date(`${data}T12:00:00`).toLocaleDateString('en-US',{weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}}
                </v-col>
                <v-col cols="3" class="text--secondary">Number of items: {{content.length}}</v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-scroll-x-transition v-for="item in content" :key="item.id" leave-absolute>
                <v-card class="mb-2" elevation="5">
                  <v-sheet dark align="center" :color="setcolor(item)" height="20" width="100%" style="font-size: 11pt;">&nbsp;{{setname(item)}}</v-sheet>
                  <div class="d-inline-block" style="width:calc(100% - 44px); ">
                    <v-card-title>{{item.name}}</v-card-title>
                    <v-card-subtitle class="text--secondary">Notes:&nbsp;{{item.notes}}</v-card-subtitle>
                  </div>
                  <v-menu transition="scale-transition">
                    <template v-slot:activator="{on, attrs}">
                      <v-btn v-bind="attrs" v-on="on" class="d-inline-block mt-2 mr-2 float-right" icon><v-icon>mdi-dots-vertical</v-icon></v-btn>
                    </template>
                    <v-list dense>
                      <v-list-item link @click="deleteitem(item.id)">
                        <v-list-item-content>
                          <v-list-item-title><v-icon small color="red">mdi-delete</v-icon>&nbsp;Delete Event</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item link @click="launchsavedialog(item.id)">
                        <v-list-item-content>
                          <v-list-item-title><v-icon small color="blue">mdi-calendar-export</v-icon>&nbsp;Export Event</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                  
                </v-card>
              </v-scroll-x-transition>
              
            </v-expansion-panel-content>
          </v-expansion-panel>
          </v-scroll-x-transition>
        </v-expansion-panels>


        <v-container fill-height>
            <v-row justify="center" align="center">
                <v-col cols="1200" sm="9">
                  <v-fade-transition leave-absolute>
                    <div v-if="notaskswindow">                  
                      <p align="center" justify="center" style="font-size: 5vh;">Haven't added anything yet?</p>
                      <p align="center" justify="center" style="font-size: 3vh; color: gray;">Here's some things you should do!</p>
                      
                      <v-card outlined class="pa-1" link @click="dialogopen = true">
                        <v-card-title ><v-icon>mdi-calendar-plus</v-icon>&nbsp;Add a new event</v-card-title>  
                      </v-card>
                      <br>
                      <v-card outlined class="pa-1" link @click="launchopendialog()">
                        <v-card-title><v-icon>mdi-calendar-import</v-icon>&nbsp;Import an event file</v-card-title>
                      </v-card>
                    </div>
                  </v-fade-transition>

                  <v-dialog v-model="dialogopen" width="600">
                    <v-card>
                      <v-card-title background-color="purple" class="text-h4 purple" style="color:white;">Add event</v-card-title>
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

                  <v-dialog v-model="nohashwindow" width="600">
                    <v-card>
                      <v-card-title class="text-h5 red" style="color:white;">Corrupted or Insecure event</v-card-title>
                      <v-container>
                        <v-card-subtitle>The event you have tried to add is corrupted, or has been modified. This event will be rejected for your safety. Ask the person you got this event from to give you another copy if you are sure that this event is safe.</v-card-subtitle>
                      </v-container>
                      <v-card-actions>
                        <v-spacer/>
                          <v-btn text color="red" @click="nohashwindow=false">OK</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>


                </v-col>
            </v-row>
        </v-container>


      </v-container>
      
    </v-main>
    <v-snackbar v-model="norecs" rounded="pill">
      Recommendations will only become available once you add an event
      <template v-slot:action="attrs">
        <v-btn v-bind="attrs" icon color="red" @click="norecs=false"><v-icon>mdi-close</v-icon></v-btn>
      </template>
    </v-snackbar>
  </div>
 
</template>




<script lang="js">
import Vue from 'vue';
import underscore from 'vue-underscore';

import * as tauri from "@tauri-apps/api";
import * as tauriFSExtra from "tauri-plugin-fs-extra-api"
import md5 from "md5";
import { v4 as uuidv4 } from 'uuid';

Vue.use(underscore);

import uuid from "vue-uuid";

// Vue.use(UUID);



export default Vue.extend({
  name: 'App',

  data: function() {
    return {
      panel: [],
      collapsevisible: false,
      message: "renderer",
      navexpanded: false,
      recsexpanded: false,
      norecs: false,
      notaskswindow: true,
      appbaricon: "mdi-menu",
      dialogopen: false,
      menu: false,
      nohashwindow: false,
      datas: [],

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
      else{this.notaskswindow = true;}
    },
    panel (){
      this.panel.length != 0 ? this.collapsevisible = true : this.collapsevisible = false
    },

  },

  methods:{

    launchopendialog(){
      tauri.dialog.open().then((value) => {tauri.fs.readTextFile(value).then((val)=>{
        var obj = JSON.parse(val)

        if (obj['hash'] == md5(JSON.stringify(obj['events']))){
          this.datas.push(obj['events'])
        }
        else{
          this.nohashwindow = true
        }
        

        }
        )})
    },
    
    launchsavedialog(id){
      tauri.dialog.save({
        filters: [{
          name: "TaskMaster Event",
          extensions: ["tme"]
        }]
      }).then((val) => {
        console.log(this.datas[1])
        tauri.fs.writeFile({contents: `{"events":${JSON.stringify(this.datas[this.datas.map(object => object.id).indexOf(id)])}, "hash":"${md5(JSON.stringify(this.datas[this.datas.map(object => object.id).indexOf(id)]))}"}`, path: val})   
      })
    },

    deleteitem(id){
      this.datas.splice(this.datas.map(object => object.id).indexOf(id), 1)
      this.pushtojson()
    },

    closepanels(){
      this.panel = []
    },
    
    pushtoarray(){
      this.datas.push({id:uuidv4(), name: this.eventname, notes: this.notes, type: this.type+1, date: this.date});
    },
    pushtojson(){
      var jsoned = JSON.stringify(this.datas)
      tauri.fs.createDir("TaskMasterData", {dir: tauri.fs.BaseDirectory.Document}).catch(err => console.log('The TaskMasterData folder already exists. Process going home.'))
      tauri.fs.writeFile({contents: jsoned, path: "TaskMasterData/user.json"}, {dir: tauri.fs.BaseDirectory.Document})      
    },
    setname(item){
      if (item.type == 1){
        return "Summative"
      }
      else if (item.type == 2){
        return "Formative"
      }
      else if (item.type == 3){
        return "Informative"
      }
      else {
        return "Other"
      }
    },
    setcolor(item){
      if (item.type == 1){
        return "deep-purple"
      }
      else if (item.type == 2){
        return "indigo"
      }
      else if (item.type == 3){
        return "blue"
      }
      else {
        return "deep-orange"
      }
    },
    updateduein(item){
      var today = new Date()
      var setdate = new Date(item.date)

      var diff = (setdate.getTime()-today.getTime())/86400000
      
      if (Math.ceil(diff) > 0){
        return [`Due in ${Math.ceil(diff)} day(s)`, 'green']
      }
      else if (Math.ceil(diff) == 0){
        return [`Due today`, 'orange']
      }
      else{
        return [`Overdue by ${Math.abs(Math.ceil(diff))} day(s)`, 'red']
      }
    },

    recslock(){
      if (this.notaskswindow){
        this.norecs = true
      }
      else{
        this.recsexpanded = !this.recsexpanded
      }
    },
  },

  beforeMount(){
      tauri.fs.readTextFile("TaskMasterData/user.json", {dir: tauri.fs.BaseDirectory.Document}).then((val) => {
      var jsonc = JSON.parse(val)
      this.datas = jsonc
      })
      tauriFSExtra.exists("C:/Users/Aryan Tadepalli/Documents/TaskMasterData/user.json").then((val) => {
        if (!val){
          tauri.fs.writeFile({contents: '[]', path: "TaskMasterData/user.json"}, {dir: tauri.fs.BaseDirectory.Document})  
        }
      })
      console.log(md5("this will output a hash!"))
  },

  computed: {
    typesortedarray(){ 
      var sortedarray = [...this.datas].sort((a, b) => {return a.type - b.type})
      var grouped = this.$_.groupBy(sortedarray, (array)=>{return array.date})
      return Object.keys(grouped).sort().reduce(
          (obj, key) => { 
            obj[key] = grouped[key]; 
            return obj;
          }, 
          {}
      )
      

    },
    prioritysortedarray(){ 
      return [...this.datas].sort((a, b) => {
        var today = new Date()
        var dateuno = new Date(a.date)
        var datedos = new Date(b.date)  

        return (dateuno.getTime()-today.getTime())*a.type - (datedos.getTime()-today.getTime()*b.type)
      })
    },
  }
});

</script>

