import { createRouter, createWebHashHistory } from 'vue-router'
import Map from  '../views/map.vue'
import Introducation from '../views/introducation.vue'


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path:"/",
      component:Map,
      children:[
        {
          path:'/introducation',
          component:Introducation
        }
      ]
    }
  ]
})

export default router
