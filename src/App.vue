<template>
  <div id="app">
    <Header />
    <transition name="slide" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Header from './components/Header'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: grid;
  grid-template-columns: 27rem 1fr;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

html {
  box-sizing: border-box;
}

body {
  font-size: 62.5%;
  margin: 0;
  padding: 0;
  box-sizing: inherit;
  cursor: none;
}

.slide-enter {
  transform: translateY(-100%);
}

.slide-leave-to {
  transform: translateX(100%);
}

.slide-enter-active, .slide-leave-active {
  transition: all 1s ease;
}

</style>
