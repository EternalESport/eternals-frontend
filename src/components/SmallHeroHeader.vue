<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    <h1>{{ msg }}</h1>
    <div class="fade"></div>
  </div>
</template>

<style scoped>
h1 {
  font-family: "NewOrderBold";
  color: white;
  font-size: 5rem;
  position: relative;
  top: 0;
  text-align: center;
  width: 100%;
  padding: 0 20px;
  line-height: 1.1;
  margin-top: 80px;
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.8);
}

.greetings{
  padding-top: 100px;
  background-image: url('./../assets/img/wallpaper.png');
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.5);
  padding-bottom: 100px;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-position-y: -300px;
  position: relative;
  z-index: -1;
}

.title {
  display: block;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  top: 0;
}

.fade{
  background: linear-gradient(to bottom, rgba(56, 56, 56, 0), #6A6D7A);
  position: absolute;
  bottom: 0;
  height: 50px;
  margin-top: -100px;
  width: 100%;
}

@media (max-width: 1800px){
  .greetings{
    background-position-y: -200px;
    background-size: 1800px;
  }
}

@media (max-width: 600px) {

  h1 {
    font-size: 3rem;
    margin-top: 30px;
  }
  .greetings{
    padding-bottom: 50px;
  }
  .title {
    width: 90%;
  }
}
</style>
