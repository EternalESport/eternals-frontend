<script setup>
import config from '@/config.json'
import { ref, onMounted } from 'vue'

const videos = ref([])

// Helper to clean up HTML entities and URL encoding in titles
function cleanTitle(title) {
  // Remove URL encoding
  let decoded = decodeURIComponent(title)
  // Replace common HTML entities (including &#39;)
  decoded = decoded.replace(/&#39;/g, "'")
                   .replace(/&quot;/g, '"')
                   .replace(/&amp;/g, '&')
                   .replace(/&lt;/g, '<')
                   .replace(/&gt;/g, '>')
                   .replace(/&nbsp;/g, ' ')
  return decoded
}

onMounted(async () => {
  // Fetch the uploads playlist ID
  const channelRes = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${config.youtubeChannelId}&maxResults=6&order=date&type=video&key=${config.youtubeKey}`
  )
  const channelData = await channelRes.json()

  console.log(channelData)

  // Fetch the most recent videos from the uploads
  if (channelData) {
    videos.value = channelData.items || []
  }
})
</script>

<template>
  <div class="youtube-videos">
    <h2>Dernières vidéos</h2>
    <div class="videos-list">
      <a
        v-for="video in videos"
        :key="video.id.videoId"
        :href="`https://www.youtube.com/watch?v=${video.id.videoId}`"
        class="video"
        target="_blank"
        rel="noopener"
      >
        <img :src="video.snippet.thumbnails.high.url" :alt="cleanTitle(video.snippet.title)" />
        <div class="title">{{ cleanTitle(video.snippet.title) }}</div>
      </a>
    </div>
    <div class="yt-link">
      <a :href="config.youtubeChannel" target="_blank" rel="noopener" class="btn">
        Voir la chaîne YouTube
      </a>
    </div>
  </div>
</template>

<style scoped>
.youtube-videos {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 30px 0;
  text-align: center;
  /* Gradient background: top 80% grey to black */
  background: linear-gradient(
    to bottom,
    rgba(106, 109, 122, 1) 0%,
    rgba(106, 109, 122, 0.5) 40%,
    rgb(17, 17, 17) 100%
  );
  box-sizing: border-box;
}
.youtube-videos h2 {
  color: white;
  font-size: 65px;
  margin-bottom: 20px;
  font-family: "NewOrderBold";
}
.videos-list {
  max-width: 1200px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
.video {
  background: #181818;
  border-radius: 10px;
  overflow: hidden;
  width: 320px;
  max-width: 90vw;
  text-decoration: none;
  color: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.video:hover {
  transform: scale(1.03);
}
.video img {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  display: block;
}
.title {
  padding: 10px;
  font-size: 1rem;
  text-align: left;
  font-family: "GeneralSansSemiBold";
  min-height: 48px;
}
.yt-link {
  margin-top: 30px;
}
  .btn{
    font-size:1.1em;
    background-color: var(--main-color);
    color: white;
    padding: 15px;
    border-radius: 35px;
    margin:0% 1%;
    font-weight: bold;
  }
  .btn:hover{
    transition: 0.5s;
    background-color: white;
    color: black;
  }
@media (max-width: 700px) {
  .videos-list {
    flex-direction: column;
    gap: 16px;
    margin: 20px;
  }
  .video {
    width: 98%;
    max-width: 100%;
  }
  .youtube-videos h2 {
    font-size: 1.3rem;
  }
}
</style>