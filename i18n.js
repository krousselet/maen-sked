import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      story: 'Story',
    },
    message: {
      hello: 'I am Patricia',
      slogan: 'Your story begins here',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      about: 'Détails',
      story: 'Histoire',
    },
    message: {
        hello: 'Je suis Patricia',
        slogan: 'Votre histoire commence ici',
    },
  },
}

const i18n = createI18n({
  legacy: false, // Use modern Composition API
  locale: 'fr', // Set default locale
  fallbackLocale: 'en',
  messages,
})

export default i18n