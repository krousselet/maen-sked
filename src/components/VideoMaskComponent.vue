<template>
  <main class="mask-airfrance">
    <div class="video-container">
      <video autoplay muted loop playsinline>
        <source src="/videos/video_mask.mp4" type="video/mp4" alt="image de WmMedia"
        href="https://www.vecteezy.com/free-videos/saint-petersburg">"
        />
        Le navigateur ne supporte pas la vidéo.
      </video>
    </div>

    <div class="svg-container">
      <svg preserveAspectRatio="xMidYMid slice" viewBox="0 0 100 100">
        <defs>
          <mask id="mask">
            <rect id="title-rect" width="100%" height="100%" fill="white" />
            <text
              x="50%"
              y="40%"
              text-anchor="middle"
              fill="black"
              font-family="Courier New"
              font-weight="bold"
              :font-size="titleFontSize"
              dominant-baseline="middle"
            >
             {{ $t("message.hello") }} 
            </text>
         
            <circle r="2" cx="50" cy="30" fill="black" />
            <circle r="2" cx="50" cy="60" fill="black" />
            <circle r=".3rem" cx="50" cy="50" fill="black" />

            <text
              x="50%"
              y="65%"
              text-anchor="middle"
              fill="black"
              font-family="Courier New"
              font-weight="bold"
              :font-size="sloganFontSize"
              dominant-baseline="middle"
            >
              {{ $t("message.slogan") }}
            </text>
          </mask>
        </defs>
        <rect
          id="rect"
          width="100%"
          height="100%"
          fill="var(--mask-fill)"
          mask="url(#mask)"
        />
      </svg>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      screenWidth: window.innerWidth,
    };
  },
  computed: {
    viewBox() {
      return "0 0 100 100"; // Keep this constant unless you need a taller box
    },
    titleFontSize() {
      if (this.screenWidth < 550) return 3;
      if (this.screenWidth < 1024) return 5;
      return 6; // Large desktops or ultrawide screens
    },
    sloganFontSize() {
      if (this.screenWidth < 550) return 3;
      if (this.screenWidth < 1024) return 3;
      return 5;
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.screenWidth = window.innerWidth;
    },
  },
};
</script>

<style scoped lang="scss">
.mask-airfrance {
  --mask-fill: white;
  width: 100vw;
  height: 100svh; // Handles mobile viewport units safely
  position: relative;
  overflow: hidden;
}

body.dark-mode .mask-airfrance {
  --mask-fill: black;
}

.video-container,
.svg-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-container video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.svg-container svg {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
