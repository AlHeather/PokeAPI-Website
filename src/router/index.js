import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PokemonDetails from '@/components/PokemonDetails.vue'
import AbilityDetails from '@/components/AbilityDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/pokemon/:PokemonName',
      name: "PokemonDetails",
      component: PokemonDetails
    },
    {
      path:'/ability/:abilityName',
      name: "AbilityDetails",
      component: AbilityDetails,
    }

  ]
})

export default router
