<template>
  <div class="story-container">
    <section
      v-for="(block, index) in storyBlocks"
      :key="index"
      class="story-section"
      :class="{ 'image-section': block.type === 'image' }"
    >
      <!-- Text section -->
      <div v-if="block.type === 'text'" class="story-text">
        <h1>{{ $t(block.title) }}</h1>
        <p class="libertinus-sans-regular">{{ $t(block.content) }}</p>
      </div>

      <!-- Image section -->
      <div v-else-if="block.type === 'image'" class="story-image">
        <img :src="block.src" :alt="$t(block.alt) || ''" />
      </div>
    </section>
  </div>
</template>

<script setup>
// Your story is defined using i18n keys for text.
// The actual translations live in your i18n message files.
const storyBlocks = [
  {
    type: "text",
    title: "story.chapter1.title",
    content: "story.chapter1.content"
  },
  {
    type: "image",
    src: "/images/atelier_0.png",
    alt: "story.chapter1.imageAlt"
  },
  {
    type: "text",
    title: "story.chapter2.title",
    content: "story.chapter2.content"
  },
  {
    type: "image",
    src: "/images/atelier_1.png",
    alt: "story.chapter2.imageAlt"
  }
];
</script>

<style scoped lang="scss">
.story-container {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}

.story-section {
  height: 100vh;
  scroll-snap-align: start;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.story-text {
  max-width: 800px;
  text-align: center;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  gap: 150px;
}

h1 {
  font-size: 6rem;
  letter-spacing: 25px;
}

p {
  font-size: 2rem;
  letter-spacing: 2px;
  line-height: 50px;
}



.story-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-section {
  padding: 0; /* Images take full screen */
}
</style>
