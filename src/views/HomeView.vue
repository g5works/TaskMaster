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
        <v-list-item link @click="addexpanded=true">
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


    <v-navigation-drawer v-model="addexpanded" color="purple" width="500" app temporary>  

      <v-list dark>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title style="font-size: 20pt; font-weight: bold;" align="center">Add new event</v-list-item-title>
            <v-list-item-subtitle align="center">Place a new event in the list</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-container>
        <v-text-field filled counter clearable clear-icon="mdi-eraser" label="Enter event name"></v-text-field>
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
        <v-btn-toggle mandatory style="width:100%;">
          <v-btn>Summative</v-btn>
          <v-btn>Formative</v-btn>
          <v-btn>Informative</v-btn>
          <v-btn>Other</v-btn>
        </v-btn-toggle>

      </v-container>
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
          <v-sheet align="center" v-bind:color=item.color height="20" width="100%" style="font-size: 11pt;">{{item.type}}</v-sheet>
          <v-card-title>{{item.name}}</v-card-title>
          <v-card-subtitle>Due in:&nbsp;{{item.notes}}&nbsp;days</v-card-subtitle>
        </v-card>
        

      </v-container>
    </v-navigation-drawer>


    <v-main>
      <v-container fluid>

        <v-card v-for="(item, index) in datas" class="mb-2" :key="index">
          <v-sheet align="center" v-bind:color=item.color height="20" width="100%" style="font-size: 11pt;">{{item.type}}</v-sheet>
          <v-card-title>{{item.name}}</v-card-title>
          <v-card-subtitle>Notes:&nbsp;{{item.notes}}</v-card-subtitle>
        </v-card>
        <v-container fill-height>
            <v-row justify="center" align="center">
                <v-col cols="1200" sm="9">
                  <p align="center" justify="center" style="font-size: 5vh;">Haven't added anything yet?</p>
                  <p align="center" justify="center" style="font-size: 3vh; color: gray;">Here's some things you should do!</p>
                  <v-card outlined class="pa-1" link @click="addexpanded=true">
                    <v-card-title><v-icon>mdi-calendar-plus</v-icon>&nbsp;Add a new event</v-card-title>
                  </v-card>
                  <br>
                  <v-card outlined class="pa-1" link>
                    <v-card-title><v-icon>mdi-calendar-import</v-icon>&nbsp;Import an event file</v-card-title>
                    
                  </v-card>
                </v-col>
            </v-row>
        </v-container>

      </v-container>
      
    </v-main>
  </div>
 
</template>




<script lang="ts">
import Vue from 'vue';

Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    (el as any).clickOutsideEvent = function (event: MouseEvent) {
      console.log(event)
      // here I check that click was outside the el and his children
      if (!(el == event.target || el.contains((event as any).target))) {
        // and if it did, call method provided in attribute value
        (vnode as any).context[(binding as any).expression](event);
      }
    };
    document.body.addEventListener('click', (el as any).clickOutsideEvent)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', (el as any).clickOutsideEvent)
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
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      datas: [
        // {id:"identifier", name: "item one", notes: "this is an item that is in the list", type: 1, color: "green"}
      ],
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
      console.log(val)
    }
  },

  methods:{
    changeapp (){
      if (this.addexpanded){
        this.addexpanded = false
      }

    }
  }
});

</script>

<style lang="scss">

</style>
