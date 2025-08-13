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
     story: {
      chapter1: {
        title: "Chapter 1",
        content: "This is where your first part of the story goes...",
        imageAlt: "Scene 1"
      },
      chapter2: {
        title: "Chapter 2",
        content: "And here comes the second part...",
        imageAlt: "Scene 2"
      }
    }
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
     story: {
      chapter1: {
        title: "L'origine",
        content: "Il était une fois, dans un endroit reculé des terres de Bretagne, un petit joyeau délaissé de bien des yeux. Le temps avait fait son office et les occupants... partis depuis bien longtemps. Mais comme l'éternel naît de l'argile, où d'une idée nait une passion, d'un jour sans prétention se développa le projet de toute une vie.",
        imageAlt: "Scene 1"
      },
      chapter2: {
        title: "La création",
        content: "C'est alors qu'à coeur valeureux un couple s'éprit tout simplement des lieux. D'une idée naquit une vision. D'une vision naquit une fondation. D'une fondation s'éleva enfin une concrétisation.",
        imageAlt: "Scene 2"
      }
    }
  },
}

const i18n = createI18n({
  legacy: false, // Use modern Composition API
  locale: 'fr', // Set default locale
  fallbackLocale: 'en',
  messages,
})

export default i18n