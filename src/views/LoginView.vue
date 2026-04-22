<script setup>

import { store } from '../store.js'
import axios from 'axios'
import router from '../router/index.js'

const fragment = new URL(location.href).searchParams.get('code');

console.log(fragment);

if (accessToken) {
  store.accessToken = accessToken;

  //Send to backend and auth there
  //https://discord.com/developers/docs/topics/oauth2
  const { data } = await axios.post('https://discord.com/api/v10/oauth2/token', {
    'grant_type': 'authorization_code',
    'code': accessToken,
    'redirect_uri': 'http://localhost:5173'
  }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    auth: {
      username: '1239760825443684444',
      password: 'WU-1diTg8So5suucEimDI4vLY7fJX7e5'
    }
  }
  )

  console.log(res);
}

//router.push({ path: '/'})

</script>

<template>
  <div class="content">
    <div class="text">
      <h2>Authorization processing ...</h2>
    </div>
  </div>
</template>

<style scoped>
.content {
  height: 70vh;
  color: white;
  font-family: GeneralSansMedium;
}

.text {
  width: 60%;
  margin: auto;
  padding-top: 300px;
  position: relative;
}
</style>
