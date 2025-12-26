<script setup>
import Logo from './Logo.vue';
</script>

<template>
  <div class="greetings">
    <video
      class="bg-video"
      src="../assets/mylivewallpapers.com-Dark-Star-ChoGath-LOL.mp4"
      autoplay
      muted
      loop
      playsinline
    ></video>
    <div class="title">
      <Logo />
    </div>
    <h1>Eternal E-Sport</h1>
  </div>
</template>

<style scoped>
.greetings {
  width: 100%;
  position: relative;
  padding-top: 250px;
  padding-bottom: 400px;
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  z-index: -1;
}

.bg-video {
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100vw;
  min-height: 100vh;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
  pointer-events: none;
  /* Optional: add a dark overlay for readability */
  filter: brightness(0.6);
}

.title {
  display: block;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  top: 0;
  width: 95vw;
  max-width: 30vw;
}

h1 {
  color: white;
  font-size: 14vw;
  position: relative;
  top: 15px;
  font-family: "NewOrder";
  font-weight: bolder;
  text-align: center;
  line-height: 1.1;
  margin: auto;
  padding: 0 10px;
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.8);
}

@media (min-width: 500px) {
  h1 {
    font-size: 8rem;
  }
}

h3 {
  color: white;
  font-family: "GeneralSansSemiBold";
  position: relative;
  text-align: center;
  -webkit-text-stroke-width: 0.5px;
  -webkit-text-stroke-color: black;
  font-size: 1.2rem;
}

a {
  color: white;
  text-decoration: none;
}

/* Make everything smaller when width is under 1200px */
@media (max-width: 1200px) {
  .greetings {
    padding-top: 120px;
    padding-bottom: 200px;
    background-position-y: -100px;
    background-size: 1500px;
    background-image: url('./../assets/img/wallpaper.png');
    background-attachment: fixed;
    background-position: top;
  }
  .bg-video {
    display: none;
  }
  .title {
    max-width: 30vw;
    width: 70vw;
  }
  h1 {
    font-size: 7vw;
    top: 5px;
    padding: 0 4px;
  }
  h3 {
    font-size: 1rem;
  }
}
</style>
