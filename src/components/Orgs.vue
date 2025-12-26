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
  <div class="orgs">
    <div class="orgs-header">
      <h2>Organisations Esport</h2>
    </div>
    <div ref="slider" class="keen-slider orgs-container">
      <a style="width: 250px;margin-right: 8px;" class="keen-slider__slide number-slide1 orgs-content" href="https://discord.gg/bTxzmQJgC3" target="_blank">
        <img src="../assets/orgs/Logo_black_blue_2.png" />
      </a>
      <a style="width: 250px;margin-right: 25px;" class="keen-slider__slide number-slide1 orgs-content" href="https://discord.gg/bTxzmQJgC3" target="_blank">
        <img src="../assets/orgs/Logo_black_blue_2.png" />
      </a>
      <a style="max-width: 400px;" class="keen-slider__slide number-slide2 orgs-content" href="https://discord.gg/m27pxuWBjK" target="_blank">
        <img src="../assets/orgs/Full_logo_Black_500.png" />
      </a>
      <a style="width: 250px;margin-left: 50px;" class="keen-slider__slide number-slide3 orgs-content" href="https://discord.gg/z5NRqSrVM4" target="_blank">
        <img src="../assets/orgs/N9TF_Main.png" />
      </a>
      <a style="width: 250px;margin-right: 50px;" class="keen-slider__slide number-slide4 orgs-content" href="https://discord.gg/sPVyFW9cTN" target="_blank">
        <img src="../assets/orgs/DME_2K_X_2K.png" />
      </a>
      <a class="keen-slider__slide number-slide5 orgs-content" href="https://discord.gg/tRYTYEZEeY" target="_blank">
        <img src="../assets/orgs/team_extreme_-_Jordan_Houde_1.png" />
      </a>
      <a style="width: 250px;margin-left: 25px;" class="keen-slider__slide number-slide6 orgs-content" href="https://discord.gg/YhHxm7HHvY" target="_blank">
        <img src="../assets/orgs/Rewolf_esport_lettrage_-_Logyk_1.png" />
      </a>
      <a style="width: 250px;margin:0;" class="keen-slider__slide number-slide8 orgs-content" href="https://discord.gg/bARTW92Gbp" target="_blank">
        <img src="../assets/orgs/lg-UQAM-denomination-coul.png" />
      </a>
      <a class="keen-slider__slide number-slide7 orgs-content" href="https://discord.gg/fHEv6ytMXE" target="_blank">
        <img src="../assets/orgs/LOV.Esport_-_Jo_1.png" />
      </a>
      <a style="width: 250px;margin-right: 25px;" class="keen-slider__slide number-slide1 orgs-content" href="https://discord.gg/bTxzmQJgC3" target="_blank">
        <img src="../assets/orgs/Logo_black_blue_2.png" />
      </a>
      <a style="max-width: 400px;" class="keen-slider__slide number-slide2 orgs-content" href="https://discord.gg/m27pxuWBjK" target="_blank">
        <img src="../assets/orgs/Full_logo_Black_500.png" />
      </a>
      <a style="width: 250px;margin-left: 50px;" class="keen-slider__slide number-slide3 orgs-content" href="https://discord.gg/z5NRqSrVM4" target="_blank">
        <img src="../assets/orgs/N9TF_Main.png" />
      </a>
      <a style="width: 250px;margin-right: 50px;" class="keen-slider__slide number-slide4 orgs-content" href="https://discord.gg/sPVyFW9cTN" target="_blank">
        <img src="../assets/orgs/DME_2K_X_2K.png" />
      </a>
      <a class="keen-slider__slide number-slide5 orgs-content" href="https://discord.gg/tRYTYEZEeY" target="_blank">
        <img src="../assets/orgs/team_extreme_-_Jordan_Houde_1.png" />
      </a>
      <a style="width: 250px;margin-left: 25px;" class="keen-slider__slide number-slide6 orgs-content" href="https://discord.gg/YhHxm7HHvY" target="_blank">
        <img src="../assets/orgs/Rewolf_esport_lettrage_-_Logyk_1.png" />
      </a>
      <a style="width: 250px;margin:0;" class="keen-slider__slide number-slide8 orgs-content" href="https://discord.gg/bARTW92Gbp" target="_blank">
        <img src="../assets/orgs/lg-UQAM-denomination-coul.png" />
      </a>
      <a class="keen-slider__slide number-slide7 orgs-content" href="https://discord.gg/fHEv6ytMXE" target="_blank">
        <img src="../assets/orgs/LOV.Esport_-_Jo_1.png" />
      </a>
    </div>
  </div>
</template>

<style scoped>
h2{
  font-size: 65px;
}
.orgs{
  font-family: 'NewOrderBold';
  text-align: center;
  color: white;
  background-color: #111; /* Background color for the entire component */
  padding: 20px 0; /* Add padding around the component */
  background: linear-gradient(
    to top,
    rgba(106, 109, 122, 1) 0%, /* Solid color at the top */
    rgba(106, 109, 122, 0) 100% /* Fully transparent at the bottom */
  );
}
.orgs-container {
  display: flex;
  justify-content: space-between; /* Distribute space evenly between links */
  flex-direction: row;
  align-items: center;
  margin: auto;
  padding: 50px 0; /* Add padding to the top and bottom */
}

.orgs-header {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 3em; /* Adjust font size for the header */
}

.orgs-content {
  display: flex;
  align-items: center;
}

.keen-slider__slide {
  flex: 0 0 auto; /* Prevent shrinking */
  width: auto; /* Ensure slides fit their content */
  max-width: 300px; /* Set a maximum width for each slide */
  transition: 0ms !important;
  overflow: visible;
}

.orgs-content a {
  flex: 1; /* Make all links take equal space */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px; /* Set a fixed height for all links */
  margin: 0 10px; /* Add spacing between links */
}

.orgs-content img {
  padding: 5px;
  height: 150px; /* Ensure all images have the same height */
  max-width: 100%; /* Prevent images from overflowing horizontally */
  object-fit: contain; /* Maintain aspect ratio */
  transition: transform 0.3s ease; /* Smooth transition */
  margin: auto;
  cursor: pointer; /* Change cursor to pointer on hover */
  &:hover {
    transform: scale(1.02); /* Scale up on hover */
  }
}

@media (max-width: 1200px) {
  h2{
    padding-top: 15px;
    font-size: 1em; /* Adjust font size for smaller screens */
  }
}
</style>