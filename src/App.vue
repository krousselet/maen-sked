<template>
  <FlameLoader v-if="navigating" :size="500" label="Loading page… / Chargement de la page" />
  
  <nav>
    <router-link to="/">{{ $t('nav.home') }}</router-link>
    <router-link to="/about">{{ $t('nav.about') }}</router-link>
    <router-link to="/story">{{ $t('nav.story') }}</router-link>
  </nav>
  
  <router-view/>
  <LanguageSwitcher/>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import FlameLoader from '@/components/FlameLoader.vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue'

const navigating = ref(false)
const router = useRouter() // ✅ get current router instance

router.beforeEach((_to, _from, next) => {
  navigating.value = true
  next()
})

router.afterEach(() => {
  // tiny delay to avoid flicker on fast nav
  setTimeout(() => (navigating.value = false), 1200)
})
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

.libertinus-sans-regular {
  font-family: "Libertinus Sans", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.libertinus-sans-bold {
  font-family: "Libertinus Sans", sans-serif;
  font-weight: 700;
  font-style: normal;
}

.libertinus-sans-regular-italic {
  font-family: "Libertinus Sans", sans-serif;
  font-weight: 400;
  font-style: italic;
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
