<template>
  <div
    v-if="visible"
    class="flame-overlay"
    role="status"
    aria-live="polite"
    :aria-label="ariaLabel"
  >
    <div class="flame-wrap" :style="sizeStyle">
      <!-- Soft glow behind the flame -->
      <svg :width="size" :height="size" viewBox="0 0 200 200" class="flame-svg">
        <defs>
          <!-- Warm gradient for flame bodies -->
          <radialGradient id="flameGrad" cx="50%" cy="70%" r="60%">
            <stop offset="0%" stop-color="#fff6c7" />
            <stop offset="40%" stop-color="#ffd166" />
            <stop offset="70%" stop-color="#ff7a1a" />
            <stop offset="100%" stop-color="#e95016" />
          </radialGradient>

          <!-- Inner white-hot core -->
          <radialGradient id="coreGrad" cx="50%" cy="65%" r="45%">
            <stop offset="0%" stop-color="#ffffff" />
            <stop offset="40%" stop-color="#fff5d6" />
            <stop offset="100%" stop-color="#ffd166" />
          </radialGradient>

          <!-- Turbulence + displacement to make the flame “waver” -->
          <filter id="wobble" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012"
              numOctaves="2"
              seed="3"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.012;0.02;0.012"
                dur="2.2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="seed"
                values="3;5;3"
                dur="1.8s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
            <feGaussianBlur stdDeviation="0.3" />
          </filter>

          <!-- Glow -->
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <!-- Outer glow ellipse -->
        <ellipse cx="100" cy="130" rx="46" ry="18" opacity="0.35" filter="url(#softGlow)" />

        <!-- The flame group rotates + gently bobs -->
        <g class="flame" filter="url(#wobble)">
          <!-- Outer flame body -->
          <path
            d="M100 162
               C 70 152, 58 130, 66 108
               C 73 90, 92 79, 96 60
               C 100 43, 90 32, 90 24
               C 112 38, 124 56, 126 72
               C 128 86, 119 101, 128 114
               C 140 132, 128 154, 100 162 Z"
            fill="url(#flameGrad)"
          />

          <!-- Mid flame -->
          <path
            d="M102 156
               C 84 148, 78 132, 84 118
               C 90 106, 104 98, 106 84
               C 108 70, 100 60, 100 54
               C 114 64, 122 78, 122 90
               C 122 100, 116 110, 120 118
               C 126 130, 118 146, 102 156 Z"
            fill="url(#flameGrad)"
            opacity="0.9"
          />

          <!-- Core -->
          <path
            d="M102 148
               C 92 142, 90 132, 94 124
               C 98 116, 106 110, 108 100
               C 110 90, 104 84, 104 80
               C 114 88, 118 98, 118 106
               C 118 114, 114 122, 114 126
               C 114 136, 110 144, 102 148 Z"
            fill="url(#coreGrad)"
            opacity="0.95"
          />
        </g>

        <!-- Tiny sparks -->
        <g class="sparks">
          <circle cx="80" cy="140" r="2" class="spark" />
          <circle cx="120" cy="146" r="1.6" class="spark" style="animation-delay:.25s" />
          <circle cx="98" cy="150" r="1.4" class="spark" style="animation-delay:.6s" />
          <circle cx="110" cy="138" r="1.8" class="spark" style="animation-delay:1s" />
          <circle cx="90" cy="146" r="1.4" class="spark" style="animation-delay:1.35s" />
        </g>
      </svg>

      <div class="loader-text" v-if="label">{{ label }}</div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable no-undef */
import { computed } from 'vue'

const props = defineProps({
  size: { type: [Number, String], default: 160 }, // px
  visible: { type: Boolean, default: true },
  label: { type: String, default: '' },           // Optional caption under the flame
  darkBackdrop: { type: Boolean, default: true }, // Dim page behind the loader
  ariaLabel: { type: String, default: 'Loading' }
})

const sizeStyle = computed(() => ({
  '--size': typeof props.size === 'number' ? `${props.size}px` : String(props.size),
  '--backdrop': props.darkBackdrop ? 'rgba(8, 9, 12, 0.76)' : 'transparent'
}))
</script>

<style scoped>
.flame-overlay {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  background: var(--backdrop);
  z-index: 9999;
  -webkit-backdrop-filter: blur(1.5px);
  backdrop-filter: blur(1.5px);
}

.flame-wrap {
  display: grid;
  place-items: center;
  gap: 0.75rem;
  width: var(--size);
}

.flame-svg {
  width: var(--size);
  height: var(--size);
  display: block;
}

/* Motion: rotate slowly + gentle vertical bob */
.flame {
  transform-origin: 100px 120px;           /* center-ish of the flame */
  animation:
    spin 6.4s linear infinite,
    bob 2.8s ease-in-out infinite;
  filter: drop-shadow(0 12px 30px rgba(255, 120, 32, 0.35));
}

/* Sparks float upward and fade */
.sparks .spark {
  opacity: 0;
  animation: spark 1.8s ease-in-out infinite;
}

.loader-text {
  font-size: 0.95rem;
  letter-spacing: 0.02em;
  color: #ffe4c4;
  text-shadow: 0 1px 2px rgba(0,0,0,.25);
}

/* Keyframes */
@keyframes spin {
  from { transform: rotate(0turn) }
  to   { transform: rotate(1turn) }
}

@keyframes bob {
  0%, 100% { transform: translateY(0) }
  50%      { transform: translateY(-4px) }
}

@keyframes spark {
  0%   { transform: translateY(0) scale(1);   opacity: 0 }
  15%  { opacity: 0.9 }
  100% { transform: translateY(-28px) scale(0.6); opacity: 0 }
}

/* Respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .flame {
    animation: none;
  }
  .sparks .spark {
    animation: none;
    opacity: 0.4;
  }
}
</style>
