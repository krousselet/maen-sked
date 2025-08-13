<template>
  <div class="story-container">
    <section
      v-for="(block, index) in storyBlocks"
      :key="index"
      class="story-section"
      :class="{ 'image-section': block.type === 'image' }"
      v-intersect="(isVisible) => handleVisibility(index, isVisible)"
    >
      <!-- Text section -->
      <transition
        name="fade-slide"
        appear
        v-if="block.type === 'text' && visibleSections.has(index)"
      >
        <div class="story-text">
          <h1>{{ $t(block.title) }}</h1>
          <p class="libertinus-sans-regular">{{ $t(block.content) }}</p>
        </div>
      </transition>

      <!-- Image section -->
      <transition
        name="stone-lift"
        appear
        v-else-if="block.type === 'image' && visibleSections.has(index)"
      >
        <div class="story-image">
          <img :src="block.src" :alt="$t(block.alt) || ''" />
        </div>
      </transition>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Blocks for your story — using i18n keys
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

// Track which sections are visible (for animations)
const visibleSections = ref(new Set());

// Handler for when sections appear/disappear
function handleVisibility(index, isVisible) {
  if (isVisible) {
    visibleSections.value.add(index);
  } else {
    visibleSections.value.delete(index);
  }
}

// Intersection directive that calls binding with true/false
const vIntersect = {
  mounted(el, binding) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        binding.value(entry.isIntersecting);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
  }
};
</script>

<script>
export default {
  directives: {
    intersect: {
      mounted(el, binding) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            binding.value(entry.isIntersecting);
          },
          { threshold: 0.4 }
        );
        observer.observe(el);
      }
    }
  }
};
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
  grid-template-rows: auto auto;
  gap: 2rem;
}

h1 {
  font-size: clamp(2rem, 6vw, 6rem);
  letter-spacing: 0.1em;
}

p {
  font-size: clamp(1rem, 2.5vw, 2rem);
  letter-spacing: 2px;
  line-height: 1.6;
}

.story-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-section {
  padding: 0;
}

/* Animations */
.fade-slide-enter-active {
  animation: fadeSlideIn 1.2s ease forwards;
}
.stone-lift-enter-active {
  animation: stoneLift 1.4s ease forwards;
}

@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes stoneLift {
  0% {
    opacity: 0;
    transform: translateY(80px) scale(0.95);
  }
  50% {
    opacity: 0.8;
    transform: translateY(20px) scale(1.02);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .story-text {
    gap: 1.5rem;
  }
  h1 {
    font-size: clamp(1.8rem, 5vw, 4rem);
    letter-spacing: 0.05em;
  }
  p {
    font-size: clamp(1rem, 2.5vw, 1.5rem);
    line-height: 1.4;
  }
}
</style>
