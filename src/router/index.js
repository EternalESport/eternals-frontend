import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { title: 'Eternal - Accueil' },
      component: HomeView
    },
    {
      path: '/ligue',
      name: 'ligue',
      meta: { title: 'Eternal - Ligue' },
      component: () => import('../views/LigueView.vue')
    },
    {
      path: '/equipe',
      name: 'equipe',
      meta: { title: 'Eternal - Équipe' },
      component: () => import('../views/TeamView.vue')
    },
    {
      path: '/halloffame',
      name: 'HallOfFame',
      meta: { title: 'Eternal - Hall of Fame' },
      component: () => import('../views/HoFView.vue')
    },
    {
      path: '/mission',
      name: 'Mission',
      meta: { title: 'Eternal - Mission' },
      component: () => import('../views/MissionView.vue')
    },
    { 
      path: '/classement', 
      name: 'standings',
      meta: { title: 'Eternal - Classement' },
      component: () => import('../views/StandingsView.vue')
    },
    { 
      path: '/stats', 
      name: 'stats',
      meta: { title: 'Eternal - Stats' },
      component: () => import('../views/StatsView.vue')
    },
    { 
      path: '/regulations', 
      name: 'regulations',
      meta: { title: 'Eternal - Regulations' },
      component: () => import('../views/RegulationsView.vue')
    },
    { 
      path: '/circuit', 
      name: 'circuit',
      meta: { title: 'Eternal - Circuit' },
      component: () => import('../views/CircuitView.vue')
    },
    { 
      path: '/riftbound', 
      name: 'riftbound',
      meta: { title: 'Eternal - Riftbound' },
      component: () => import('../views/RiftboundView.vue')
    },
    { 
      meta: { title: 'Eternal - 404' },
      path: '/:pathMatch(.*)*', 
      component: () => import('../views/NotFoundView.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router
