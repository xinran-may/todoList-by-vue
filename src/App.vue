
<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div id="app">
    <h1>{{title}}</h1>
    <div class="input-group">
      <input type="text" class="form-control" placeholder="new item" v-model="newItem" v-on:keyup.enter="addItem">
      <button type="button" class="btn btn-info cusor-hand" v-on:click="addItem">add</button>
    </div>
    <div class="btn-group" role="group">
      <button type="button" class="btn btn-warning" v-on:click="resetAllItem">reset all</button>
      <button type="button" class="btn btn-success" v-on:click="finishAllItem">finish all</button>
      <button type="button" class="btn btn-danger" v-on:click="clearAllItem">clear all</button>
    </div>
    <ul class="list-group">
      <li class="list-group-item justify-content-between" v-bind:class="{'list-group-item-success':item.isFinished}"  v-for="(item,index) in items">
        <input type="checkbox"  v-bind:checked="item.isFinished" v-on:click="toggleFinish(item)">
        <span v-bind:class="{finished:item.isFinished}">{{item.label}}</span>
        <a href="javascript:void(0)" class="cusor-hand" v-on:click="deleteItem(index)"><icon name="trash-o"></icon></a>
        <!--<span class="badge badge-default badge-pill">1</span>-->
      </li>
    </ul>
  </div>
</template>

<script>
  import 'vue-awesome/icons';
  import Store from './store';
  export default {
    data(){
        return {
          title: 'TodoList',
          items:Store.fetch(),
          newItem:''
        };
    },
    methods:{
      toggleFinish(item){
          item.isFinished = !item.isFinished;
      },
      addItem(){
        if(this.newItem.length <= 0)
            return false;
        this.items.push({label:this.newItem,isFinished:false});
        this.newItem = '';
      },
      deleteItem(index){
          this.items.splice(index,1);
      },
      resetAllItem(){
          this.items.forEach((value) => {
              value.isFinished = false;
          })
      },
      finishAllItem(){
        this.items.forEach((value) => {
          value.isFinished = true;
        })
      },
      clearAllItem(){
        this.items = [];
      }
    },
    watch:{
        items : {
          handler(newVal,oldVal){
              Store.save(newVal);
          },
          deep:true
        }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    min-width: 40rem;
    margin: 0 auto;
    padding: 4rem 0;
  }
  .finished{
    text-decoration: line-through;
   }
  .cusor-hand{
    cursor: pointer;
  }
  .btn-group{
    width: 100%;
  }
  .btn-group button{
    width: 33.33333%;
  }
  .input-group{
    margin: 2rem 0;
  }
</style>
