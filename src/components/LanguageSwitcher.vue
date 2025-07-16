<template>
  <div>
    <select v-model="locale">
      <option value="en">English</option>
      <option value="fr">Français</option>
    </select>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
</script>

<style lang="scss" scoped>
div {
  position: absolute;
  top: 60px;
  left: 50px;
}
</style>