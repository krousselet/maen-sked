
<template>
  <nav>
    <router-link to="/">{{ $t('nav.home') }}</router-link>
    <router-link to="/about">{{ $t('nav.about') }}</router-link>
    <router-link to="/story">{{ $t('nav.story') }}</router-link>
  </nav>
  <router-view/>
  <LanguageSwitcher/>
</template>

  <script setup>
  import LanguageSwitcher from './components/LanguageSwitcher.vue';
  
  </script>
<style lang="scss">
*, ::after, ::before {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;


}

//PERSONAL CLASSES
.elvish {
  font-family: 'Tangerine', serif;
}

nav {
  padding: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
