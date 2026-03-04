<script setup>
</script>

<script>
import "keen-slider/keen-slider.min.css"
import KeenSlider from "keen-slider"

const animation = { duration: 100000, easing: (t) => t }

export default {
  name: "Slider",
  mounted() {
    this.slider = new KeenSlider(this.$refs.slider, {
      loop: true,
      renderMode: "performance",
      drag: false,
      slides: { perView: "auto" },
      created(s) {
        s.moveToIdx(5, true, animation)
      },
      updated(s) {
        s.moveToIdx(s.track.details.abs + 5, true, animation)
      },
      animationEnded(s) {
        s.moveToIdx(s.track.details.abs + 5, true, animation)
      },
    })
  },
  beforeDestroy() {
    if (this.slider) this.slider.destroy()
  },
}
</script>

<template>
  <div class="partners">
    <div class="temp">
      <a href="https://www.facebook.com/claudineportelancecourtier/?locale=fr_FR" target="_blank">
        <img src="../assets/orgs/view-illuminated-neon-gaming-keyboard-setup-controller_copie.png" alt="Partner Logo" />
      </a>
      <a href="https://cjela.qc.ca/" target="_blank">
        <img src="../assets/orgs/cje-logo-web.png" alt="Partner Logo" />
      </a>
      <a href="https://www.equipedupuy.ca/fr" target="_blank">
        <img src="../assets/orgs/menu_bar_logo.png" alt="Partner Logo" />
      </a>
      </div>
<!-- <div ref="slider" class="keen-slider logos-container">
        <div class="keen-slider__slide number-slide1">
          <img src="../assets/img/pr.png" alt="Partner Logo" />
        </div>
        <div class="keen-slider__slide number-slide2">
          <img src="../assets/img/salvatore.png" alt="Partner Logo" />
        </div>
        <div class="keen-slider__slide number-slide4">
          <img src="../assets/img/adt.png" alt="Partner Logo" />
        </div>
        <div class="keen-slider__slide number-slide5">
          <img src="../assets/img/votrepoutine.png" alt="Partner Logo" />
        </div>
        <div class="keen-slider__slide number-slide1">
          <img src="../assets/img/pr.png" alt="Partner Logo" />
        </div>
        <div class="keen-slider__slide number-slide2">
          <img src="../assets/img/salvatore.png" alt="Partner Logo" />
        </div>
        <div class="keen-slider__slide number-slide4">
          <img src="../assets/img/adt.png" alt="Partner Logo" />
        </div>
        <div class="keen-slider__slide number-slide5">
          <img src="../assets/img/votrepoutine.png" alt="Partner Logo" />
        </div>
    </div> -->
  </div>
</template>

<style scoped>
.temp {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 80px;
  margin: 0 auto;
  margin-top: 60px;
  width: 100%;
  flex-wrap: nowrap; /* NE PAS wrap, reste en ligne même sur mobile */
  overflow-x: auto; /* Permet le scroll horizontal si ça déborde */
}

.temp a {
  transition: transform 0.3s ease;
  cursor: pointer;
  display: flex;
  padding: 10px;
  align-items: center;
}

.temp img {
  transition: transform 0.3s ease;
  height: 95%;
  max-width: 180px;
  width: auto;
}

.temp img:hover {
  transform: scale(1.05);
}

@media (max-width: 1300px) {
  .temp {
    margin-top: 150px;
    gap: 40px;
  }
  .temp a {
    max-height: 120px;
  }
  .temp img {
    max-width: 100px;
    height: 90%;
  }
}

h2 {
  color: white;
  font-size: 2.5rem;
  font-family: "GeneralSansSemiBold";
  line-height: 1.1;
}

.partners {
  text-align: center;
  overflow: hidden;
}

.keen-slider__slide {
  flex: 0 0 auto; /* Prevent slides from shrinking */
  width: auto; /* Ensure slides fit their content */
  max-width: 350px;
}

.logos-container {
  position: relative;
  overflow: visible;
}

img:hover {
  transform: scale(1.05); /* Slightly enlarge the logo */
}
</style>