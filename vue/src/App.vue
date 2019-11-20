<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'App',
  data() {
    return {}
  },
  methods: {}
}
</script>

<style >
@import './style/main.css';
</style>
