<template>
  <div id="Home">
    <sidebar></sidebar>
    <div class="wrapper">
      <head-top></head-top>
      <div class="main">
        <tags></tags>
        <div class="container">
          <!-- <tabs></tabs> -->

          <!-- <transition name="move" mode="out-in"> -->
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
          <!-- </transition> -->
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import { mapState } from 'vuex'
import headTop from '../components/head/head'
import sidebar from '../components/sidebar/sidebar'
import tags from '../components/tags/tags'

export default {
  name: 'Home',
  components: {
    headTop,
    sidebar,
    tags
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      collapse: store => store.collapse
    })
  },
  methods: {}
}
</script>
<style scoped>
</style>
