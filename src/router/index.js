import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { Auth } from 'aws-amplify';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/reports',
    name: 'reports',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "reports" */ '../views/reports.vue'),
    meta: {
      is_admin: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.is_admin)) {
    Auth.currentAuthenticatedUser().then(function(result) {
      if (result.signInUserSession.idToken.payload["cognito:groups"]) {
        if (result.signInUserSession.idToken.payload["cognito:groups"].indexOf("admins") > -1) {
          console.log("isAdmin passed on route check") // DEBUG
          next()
        } else {
          console.log("isAdmin failed because admins wasn't in cognito:groups") // DEBUG
          next({ name: 'Home'})
        }
      } else {
        console.log("isAdmin failed because cognito:groups wasn't present") // DEBUG
        next({ name: 'Home'})
      }
    })
    .catch(() => {
      console.log("isAdmin failed because of error") // DEBUG
      next({ name: 'Home'})
    })
  }else {
    next()
  }
})



    


export default router

// Example of adding another route that is lazy loaded:
//  {
//    path: '/about',
//    name: 'About',
//    // route level code-splitting
//    // this generates a separate chunk (about.[hash].js) for this route
//    // which is lazy-loaded when the route is visited.
//    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//  } 