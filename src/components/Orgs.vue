<script setup>
import orgLogo1 from "../assets/orgs/Logo_black_blue_2.png"
import orgLogo2 from "../assets/orgs/N9TF_Main.png"
import orgLogo3 from "../assets/orgs/DME_2K_X_2K.png"
import orgLogo4 from "../assets/orgs/team_extreme_-_Jordan_Houde_1.png"
import orgLogo5 from "../assets/orgs/Rewolf_esport_lettrage_-_Logyk_1.png"
import orgLogo6 from "../assets/orgs/lg-UQAM-denomination-coul.png"
import orgLogo7 from "../assets/orgs/qup_mana.svg"
import orgLogo8 from "../assets/orgs/LOV.Esport_-_Jo_1.png"
import orgLogoBig from "../assets/orgs/Full_logo_Black_500.png"
import { store } from "@/store.js"
import { translations } from "@/i18n/translations"
</script>

<script>
export default {
  name: "Orgs",
  data() {
    return {
      orgs: [
        {
          href: "https://discord.gg/bTxzmQJgC3",
          src: orgLogo1,
          size: "small"
        },
        {
          href: "https://discord.gg/z5NRqSrVM4",
          src: orgLogo2,
          size: "small"
        },
        {
          href: "https://discord.gg/sPVyFW9cTN",
          src: orgLogo3,
          size: "large"
        },
        {
          href: "https://discord.gg/tRYTYEZEeY",
          src: orgLogo4,
          size: "small"
        },
        {
          href: "https://discord.gg/YhHxm7HHvY",
          src: orgLogo5,
          size: "small"
        },
        {
          href: "https://discord.gg/bARTW92Gbp",
          src: orgLogo6,
          size: "small"
        },
        {
          href: "https://discord.gg/m27pxuWBjK",
          src: orgLogoBig,
          size: "large"
        },
        {
          href: "https://discord.gg/VJVQHfCBNu",
          src: orgLogo7,
          size: "large"
        },
        {
          href: "https://discord.gg/fHEv6ytMXE",
          src: orgLogo8,
          size: "small"
        }
      ]
    }
  }
}
</script>

<template>
  <div class="orgs">
    <div class="orgs-header">
      <h2>{{ translations[store.language].components.orgs }}</h2>
    </div>
    <div class="orgs-grid">
      <!-- Top row with smaller logos -->
      <div class="orgs-row small-logos">
        <a
          v-for="(org, index) in orgs.filter(o => o.size === 'small')"
          :key="`small-${index}`"
          :href="org.href"
          target="_blank"
          class="orgs-item"
        >
          <img :src="org.src" :alt="org.src" />
        </a>
      </div>
      <!-- Bottom row with larger logo -->
      <div class="orgs-row large-logo">
        <a
          v-for="(org, index) in orgs.filter(o => o.size === 'large')"
          :key="`large-${index}`"
          :href="org.href"
          target="_blank"
          class="orgs-item"
        >
          <img :src="org.src" :alt="org.src" />
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  font-size: 65px;
  margin: 0;
  padding: 20px 0;
}

.orgs {
  font-family: 'NewOrderBold';
  text-align: center;
  color: white;
  background-color: #111;
  background: linear-gradient(
    to top,
    rgba(106, 109, 122, 1) 0%,
    rgba(106, 109, 122, 0) 100%
  );
  padding: 40px 20px;
}

.orgs-header {
  margin-bottom: 40px;
}

.orgs-grid {
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 1400px;
  margin: 0 auto;
}

.orgs-row {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 30px;
}

.small-logos {
  gap: 25px;
}

.orgs-item {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.orgs-item:hover {
  transform: scale(1.05);
}

.small-logos .orgs-item {
  height: 140px;
  min-width: 140px;
}

.small-logos .orgs-item img {
  max-height: 140px;
  max-width: 230px;
  width: auto;
  object-fit: contain;
  padding: 10px;
}

.large-logo .orgs-item {
  height: 150px;
  min-width: 150px;
}

.large-logo .orgs-item img {
  max-height: 150px;
  max-width: 320px;
  width: auto;
  object-fit: contain;
  padding: 10px;
}

/* Tablet and smaller screens */
@media (max-width: 1200px) {
  h2 {
    font-size: 48px;
  }

  .orgs {
    padding: 30px 15px;
  }

  .orgs-header {
    margin-bottom: 30px;
  }

  .orgs-row {
    gap: 20px;
  }

  .small-logos .orgs-item {
    height: 115px;
  }

  .small-logos .orgs-item img {
    max-height: 115px;
    max-width: 190px;
  }

  .large-logo .orgs-item {
    height: 130px;
  }

  .large-logo .orgs-item img {
    max-height: 130px;
    max-width: 280px;
  }
}

/* Mobile devices */
@media (max-width: 768px) {
  h2 {
    font-size: 32px;
    padding: 15px 0;
  }

  .orgs {
    padding: 20px 10px;
  }

  .orgs-header {
    margin-bottom: 20px;
  }

  .orgs-grid {
    gap: 30px;
  }

  .orgs-row {
    gap: 15px;
  }

  .small-logos {
    gap: 15px;
  }

  .small-logos .orgs-item {
    height: 95px;
  }

  .small-logos .orgs-item img {
    max-height: 95px;
    max-width: 155px;
  }

  .large-logo .orgs-item {
    height: 110px;
  }

  .large-logo .orgs-item img {
    max-height: 110px;
    max-width: 230px;
  }
}

/* Small mobile devices */
@media (max-width: 480px) {
  h2 {
    font-size: 24px;
    padding: 10px 0;
  }

  .orgs {
    padding: 15px 8px;
  }

  .orgs-header {
    margin-bottom: 15px;
  }

  .orgs-grid {
    gap: 20px;
  }

  .orgs-row {
    gap: 12px;
  }

  .small-logos {
    gap: 12px;
  }

  .small-logos .orgs-item {
    height: 80px;
  }

  .small-logos .orgs-item img {
    max-height: 80px;
    max-width: 130px;
  }

  .large-logo .orgs-item {
    height: 95px;
  }

  .large-logo .orgs-item img {
    max-height: 95px;
    max-width: 190px;
  }
}
</style>